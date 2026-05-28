
import React, { useState, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { Trash2, Plus, Tag, Upload, Image as ImageIcon, Monitor, Film, X, Loader2, FileText, MapPin, User, FolderPlus, UploadCloud, Save, AlertTriangle } from 'lucide-react';
import { PageHeaderKeys, Brand, GalleryItem, PageHeaderData } from '../../types';
import { AVAILABLE_ICONS, ICON_MAP } from '../../constants';
import { supabase } from '../../supabaseClient';

// --- HELPER COMPONENTS ---

// Save Button Helper
const SaveButton = ({ onSave }: { onSave: () => void }) => {
    const [saving, setSaving] = useState(false);
    
    const handleSave = async () => {
        setSaving(true);
        await onSave();
        setSaving(false);
    };

    return (
        <button 
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700 transition shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
            {saving ? <Loader2 size={16} className="animate-spin mr-2"/> : <Save size={16} className="mr-2"/>}
            {saving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
    );
}

// 1. Icon Picker
export const IconPicker = ({ selected, onSelect }: { selected: string, onSelect: (icon: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="relative">
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Icono</label>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between border p-2 rounded bg-white hover:bg-gray-50"
        >
          <div className="flex items-center gap-2">
             {selected && ICON_MAP[selected] ? React.createElement(ICON_MAP[selected], { size: 18, className: "text-primary" }) : <div className="w-4 h-4 bg-gray-200 rounded"></div>}
             <span className="text-sm">{selected || "Seleccionar..."}</span>
          </div>
          <Tag size={14} className="text-gray-400" />
        </button>
        
        {isOpen && (
          <div className="absolute z-50 mt-1 w-full bg-white border rounded shadow-xl max-h-48 overflow-y-auto grid grid-cols-4 gap-2 p-2">
             {AVAILABLE_ICONS.map((iconKey) => (
                <button 
                   key={iconKey}
                   onClick={() => { onSelect(iconKey); setIsOpen(false); }}
                   className={`flex flex-col items-center justify-center p-2 rounded hover:bg-blue-50 transition ${selected === iconKey ? 'bg-blue-100 ring-1 ring-blue-500' : ''}`}
                   title={iconKey}
                >
                   {React.createElement(ICON_MAP[iconKey], { size: 20, className: "text-gray-600 mb-1" })}
                </button>
             ))}
          </div>
        )}
        {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>}
      </div>
    );
};

// 2. Image Uploader (SUPABASE STORAGE)
export const ImageUploader = ({ value, onChange, recommendedSize }: { value: string, onChange: (val: string) => void, recommendedSize?: string }) => {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            // Create a clean file name to avoid issues with spaces or special chars
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = fileName;

            // Upload to Supabase Storage 'images' bucket
            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            // Get Public URL
            const { data } = supabase.storage.from('images').getPublicUrl(filePath);
            
            if (data) {
                onChange(data.publicUrl);
            }
        } catch (error: any) {
            console.error("Error uploading image:", error);
            alert(`Error al subir imagen: ${error.message}. Asegúrate de haber creado el bucket 'images' en Supabase y configurado las políticas.`);
        } finally {
            setUploading(false);
            // Reset input so same file can be selected again if needed
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; 
            }
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="border border-dashed border-gray-300 p-3 rounded bg-gray-50 hover:bg-white transition-colors relative">
            {uploading && (
                <div className="absolute inset-0 bg-white/80 z-20 flex items-center justify-center rounded">
                    <Loader2 className="animate-spin text-primary" />
                </div>
            )}
            <div className="flex justify-between items-center mb-2">
                <label className="flex items-center text-xs font-bold text-gray-500 uppercase">
                    <ImageIcon size={14} className="mr-1"/> Imagen
                </label>
                {recommendedSize && <span className="text-[10px] text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">{recommendedSize}</span>}
            </div>
            
            <div className="flex flex-col space-y-3">
                {/* Preview */}
                {value ? (
                    <div className="relative w-full h-32 bg-gray-200 rounded overflow-hidden group border">
                        <img src={value} alt="Preview" className="w-full h-full object-contain bg-checkered" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                             <button 
                                onClick={() => onChange('')}
                                className="bg-red-500 text-white px-3 py-1 rounded text-xs flex items-center hover:bg-red-600"
                            >
                                <Trash2 size={12} className="mr-1"/> Eliminar
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="h-20 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed rounded bg-white">
                        <ImageIcon size={20} className="mb-1 opacity-50"/>
                        <span className="text-[10px]">Sin imagen</span>
                    </div>
                )}

                {/* Inputs */}
                <div className="grid grid-cols-1 gap-2">
                    <div className="relative">
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleFileChange} 
                            className="hidden"
                            ref={fileInputRef}
                        />
                        <button 
                            type="button"
                            onClick={handleUploadClick}
                            disabled={uploading}
                            className="flex items-center justify-center w-full px-3 py-2 bg-white border rounded text-xs cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition shadow-sm text-center text-gray-700 font-medium disabled:opacity-50"
                        >
                           <Upload size={14} className="mr-2"/> Subir a Cloud
                        </button>
                    </div>
                    <div className="relative">
                         <span className="absolute top-2 left-2 text-xs text-gray-400 font-bold">URL</span>
                         <input 
                            className="w-full border p-2 pl-10 rounded text-xs bg-white focus:ring-1 focus:ring-blue-500 outline-none" 
                            placeholder="https://..." 
                            value={value} 
                            onChange={(e) => onChange(e.target.value)} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- EDITOR MODULES ---

export const SettingsEditor = () => {
    const { maintenanceMode, toggleMaintenance } = useData();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded shadow-sm border">
                <h2 className="text-2xl font-bold">Configuración del Sitio</h2>
            </div>
            
            <div className="bg-white p-6 rounded shadow border">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-lg mb-1">Modo Mantenimiento</h3>
                        <p className="text-gray-500 text-sm max-w-lg">
                            Cuando está activo, los visitantes verán una pantalla de "En Construcción". 
                            Los administradores pueden acceder usando el candado oculto en la pantalla de mantenimiento o iniciando sesión.
                        </p>
                    </div>
                    <div className="flex items-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="sr-only peer"
                                checked={maintenanceMode}
                                onChange={(e) => toggleMaintenance(e.target.checked)}
                            />
                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                </div>
                {maintenanceMode && (
                    <div className="mt-6 p-4 bg-yellow-50 text-yellow-800 text-sm rounded border border-yellow-200 flex items-center">
                        <AlertTriangle className="mr-2 flex-shrink-0" size={20}/>
                        <div>
                            <strong>¡Atención!</strong> El sitio web no es visible para el público actualmente.
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export const HeroEditor = () => {
    const { heroSlides, updateData, saveToDb } = useData();
    
    const handleEdit = (idx: number, field: string, value: any) => {
        const newData = [...heroSlides];
        newData[idx] = { ...newData[idx], [field]: value };
        updateData('heroSlides', newData);
    };

    const handleDelete = (idx: number) => {
        if(confirm('¿Eliminar?')) updateData('heroSlides', heroSlides.filter((_, i) => i !== idx));
    };

    return (
      <div className="space-y-8">
          <div className="flex justify-between items-center mb-4 bg-white p-4 rounded shadow-sm border">
              <div>
                 <h2 className="text-2xl font-bold">Slider Principal</h2>
                 <p className="text-xs text-gray-500">Recuerda guardar los cambios para aplicarlos en el sitio.</p>
              </div>
              <div className="flex gap-2">
                 <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600 transition" onClick={() => {
                        const newSlide = { id: Date.now(), badge: 'Nuevo', title: 'Título', subtitle: 'Subtítulo', buttonText: 'Botón', bg: '' };
                        updateData('heroSlides', [...heroSlides, newSlide]);
                    }}><Plus size={16} className="mr-2"/> Slide</button>
                 <SaveButton onSave={() => saveToDb('heroSlides', heroSlides)} />
              </div>
          </div>
            
          {heroSlides.map((slide, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow border border-gray-200 relative">
                  <button className="absolute top-4 right-4 text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full" onClick={() => handleDelete(idx)}><Trash2 size={18}/></button>
                  <h4 className="font-bold text-gray-500 mb-4 flex items-center"><span className="bg-gray-200 text-xs px-2 py-1 rounded mr-2">#{idx + 1}</span> Configuración Slide</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-1">Título Grande</label>
                            <textarea rows={2} className="w-full border p-2 rounded focus:ring-2 ring-primary/20 outline-none" value={slide.title} onChange={(e) => handleEdit(idx, 'title', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">Subtítulo</label>
                            <input className="w-full border p-2 rounded focus:ring-2 ring-primary/20 outline-none" value={slide.subtitle} onChange={(e) => handleEdit(idx, 'subtitle', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">Badge (Etiqueta)</label>
                                <input className="w-full border p-2 rounded focus:ring-2 ring-primary/20 outline-none" value={slide.badge} onChange={(e) => handleEdit(idx, 'badge', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Texto Botón</label>
                                <input className="w-full border p-2 rounded focus:ring-2 ring-primary/20 outline-none" value={slide.buttonText || ''} onChange={(e) => handleEdit(idx, 'buttonText', e.target.value)} placeholder="Ej: Agendar Cita" />
                            </div>
                        </div>
                      </div>
                      <div>
                          <ImageUploader 
                            value={slide.bg} 
                            onChange={(val) => handleEdit(idx, 'bg', val)} 
                            recommendedSize="1920x1080px"
                          />
                      </div>
                  </div>
              </div>
          ))}
      </div>
    );
};

export const HeroFeaturesEditor = () => {
    const { heroFeatures, updateData, saveToDb } = useData();

    const handleEdit = (idx: number, field: string, value: any) => {
        const newData = [...heroFeatures];
        newData[idx] = { ...newData[idx], [field]: value };
        updateData('heroFeatures', newData);
    };

    return (
        <div className="space-y-6">
           <div className="flex justify-between items-center bg-white p-4 rounded shadow-sm border">
               <div>
                  <h2 className="text-2xl font-bold">Tarjetas Informativas (Hero)</h2>
                  <span className="text-xs text-gray-500">Recomendado: 3 elementos</span>
               </div>
               <SaveButton onSave={() => saveToDb('heroFeatures', heroFeatures)} />
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {heroFeatures.map((feat, idx) => (
                   <div key={idx} className="bg-white p-4 rounded shadow border h-full flex flex-col">
                       <h4 className="font-bold text-gray-400 text-xs uppercase mb-3 border-b pb-2">Tarjeta {idx + 1}</h4>
                       <div className="space-y-3 flex-1">
                           <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Título</label>
                                <input className="w-full font-bold border p-2 rounded" value={feat.title} onChange={(e) => handleEdit(idx, 'title', e.target.value)} />
                           </div>
                           <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Descripción</label>
                                <textarea className="w-full border p-2 rounded text-sm" rows={3} value={feat.description} onChange={(e) => handleEdit(idx, 'description', e.target.value)} />
                           </div>
                           <div className="mt-auto">
                               <IconPicker selected={feat.icon} onSelect={(val) => handleEdit(idx, 'icon', val)} />
                           </div>
                       </div>
                   </div>
               ))}
           </div>
        </div>
    );
};

export const BrandsEditor = () => {
    const { clientBrands, updateData, saveToDb } = useData();

    const handleEdit = (idx: number, field: keyof Brand, value: any) => {
        const newData = [...clientBrands];
        newData[idx] = { ...newData[idx], [field]: value };
        updateData('clientBrands', newData);
    };

    const handleDelete = (idx: number) => {
        if(confirm('¿Eliminar marca?')) updateData('clientBrands', clientBrands.filter((_, i) => i !== idx));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded shadow-sm border">
                <h2 className="text-2xl font-bold">Marcas y Clientes</h2>
                <div className="flex gap-2">
                    <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600 transition" onClick={() => {
                        const newBrand: Brand = { id: Date.now(), name: "Nueva Marca", logo: "" };
                        updateData('clientBrands', [...clientBrands, newBrand]);
                    }}><Plus size={16} className="mr-2"/> Agregar</button>
                    <SaveButton onSave={() => saveToDb('clientBrands', clientBrands)} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clientBrands.map((brand, idx) => (
                    <div key={brand.id || idx} className="bg-white p-4 rounded shadow border relative group">
                        <button className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-white shadow rounded-full p-1 z-10" onClick={() => handleDelete(idx)}>
                            <Trash2 size={16}/>
                        </button>
                        <div className="flex flex-col space-y-3 pt-2">
                             <ImageUploader 
                                value={brand.logo} 
                                onChange={(val) => handleEdit(idx, 'logo', val)} 
                                recommendedSize="PNG Transparente"
                             />
                             <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nombre Marca</label>
                                <input 
                                    className="w-full border p-2 rounded text-sm font-semibold" 
                                    value={brand.name} 
                                    onChange={(e) => handleEdit(idx, 'name', e.target.value)}
                                />
                             </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const ServicesEditor = () => {
    const { services, updateData, saveToDb } = useData();

    const handleEdit = (idx: number, field: string, value: any) => {
        const newData = [...services];
        newData[idx] = { ...newData[idx], [field]: value };
        updateData('services', newData);
    };
    
    const handleDelete = (idx: number) => {
        if(confirm('¿Eliminar servicio?')) updateData('services', services.filter((_, i) => i !== idx));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded shadow-sm border">
                <h2 className="text-2xl font-bold">Servicios</h2>
                <div className="flex gap-2">
                    <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600 transition" onClick={() => {
                        updateData('services', [...services, { id: Date.now(), title: 'Nuevo Servicio', description: 'Descripción breve...', image: '', subcategories: [], icon: 'Settings' }]);
                    }}><Plus size={16} className="mr-2"/> Servicio</button>
                    <SaveButton onSave={() => saveToDb('services', services)} />
                </div>
            </div>
            {services.map((s, idx) => (
                <div key={s.id} className="bg-white p-6 rounded shadow border relative">
                    <button className="absolute top-4 right-4 text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full z-10" onClick={() => handleDelete(idx)}><Trash2 size={18}/></button>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Título del Servicio</label>
                                <input className="w-full font-bold text-lg border p-2 rounded" value={s.title} onChange={(e) => handleEdit(idx, 'title', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Descripción</label>
                                <textarea className="w-full border p-2 rounded text-sm" rows={4} value={s.description} onChange={(e) => handleEdit(idx, 'description', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Lista de sub-servicios (separar por coma)</label>
                                <input 
                                    className="w-full border p-2 rounded text-sm bg-gray-50" 
                                    value={s.subcategories?.join(', ') || ''} 
                                    onChange={(e) => handleEdit(idx, 'subcategories', e.target.value.split(',').map(item => item.trim()))} 
                                    placeholder="Ej: Aire Acondicionado, Ductos, Ventilación"
                                />
                            </div>
                            <div className="w-1/2">
                                <IconPicker selected={s.icon} onSelect={(val) => handleEdit(idx, 'icon', val)} />
                            </div>
                        </div>
                        <div>
                             <ImageUploader 
                                value={s.image} 
                                onChange={(val) => handleEdit(idx, 'image', val)} 
                                recommendedSize="800x600px"
                             />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const ProjectsEditor = () => {
    const { projects, updateData, saveToDb } = useData();
    const [newItem, setNewItem] = useState<{ type: 'image' | 'video', url: string, caption: string }>({ type: 'image', url: '', caption: '' });
    
    // Batch Upload State
    const [batchUploading, setBatchUploading] = useState(false);
    
    const handleEdit = (idx: number, field: string, value: any) => {
        const newData = [...projects];
        newData[idx] = { ...newData[idx], [field]: value };
        updateData('projects', newData);
    };

    const handleDelete = (idx: number) => {
        if(confirm('¿Eliminar proyecto?')) updateData('projects', projects.filter((_, i) => i !== idx));
    };
    
    // Gallery Helpers
    const addGalleryItem = (projectIdx: number) => {
        if (!newItem.url) return;
        const currentProject = projects[projectIdx];
        const currentGallery = currentProject.gallery || [];
        const updatedGallery = [...currentGallery, newItem];
        
        handleEdit(projectIdx, 'gallery', updatedGallery);
        setNewItem({ type: 'image', url: '', caption: '' }); // Reset form
    };

    const removeGalleryItem = (projectIdx: number, itemIdx: number) => {
        const currentProject = projects[projectIdx];
        if (!currentProject.gallery) return;
        
        const updatedGallery = currentProject.gallery.filter((_, i) => i !== itemIdx);
        handleEdit(projectIdx, 'gallery', updatedGallery);
    };

    // --- BATCH UPLOAD LOGIC ---
    const handleBatchUpload = async (e: React.ChangeEvent<HTMLInputElement>, projectIdx: number) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setBatchUploading(true);
        const uploadedItems: GalleryItem[] = [];

        try {
            // Process files
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileExt = file.name.split('.').pop();
                const fileName = `batch-${Date.now()}-${i}-${Math.random().toString(36).substring(2)}.${fileExt}`;
                
                // Upload
                const { error: uploadError } = await supabase.storage
                    .from('images')
                    .upload(fileName, file);

                if (uploadError) {
                    console.error(`Failed to upload ${file.name}:`, uploadError);
                    continue; // Skip this file and try next
                }

                // Get URL
                const { data } = supabase.storage.from('images').getPublicUrl(fileName);
                if (data) {
                    uploadedItems.push({
                        type: 'image',
                        url: data.publicUrl,
                        caption: ''
                    });
                }
            }

            // Update Project Gallery with new items
            if (uploadedItems.length > 0) {
                const currentProject = projects[projectIdx];
                const currentGallery = currentProject.gallery || [];
                const updatedGallery = [...currentGallery, ...uploadedItems];
                handleEdit(projectIdx, 'gallery', updatedGallery);
                alert(`Se subieron ${uploadedItems.length} imágenes. Haz clic en "Guardar Cambios" para confirmar.`);
            }

        } catch (error) {
            console.error("Batch upload error:", error);
            alert("Ocurrió un error durante la subida masiva.");
        } finally {
            setBatchUploading(false);
            // Reset input value to allow selecting same files again
            e.target.value = '';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded shadow-sm border">
                <h2 className="text-2xl font-bold">Proyectos Realizados</h2>
                <div className="flex gap-2">
                    <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600 transition" onClick={() => {
                        updateData('projects', [...projects, { id: Date.now(), title: 'Nuevo Proyecto', category: 'Categoría', image: '', gallery: [], description: '', client: '', location: '', scope: [] }]);
                    }}><Plus size={16} className="mr-2"/> Proyecto</button>
                    <SaveButton onSave={() => saveToDb('projects', projects)} />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-8">
                {projects.map((p, idx) => (
                    <div key={p.id} className="bg-white p-6 rounded shadow border relative">
                        <button className="absolute top-4 right-4 text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full z-10" onClick={() => handleDelete(idx)}><Trash2 size={18}/></button>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                            <div>
                                <h4 className="font-bold text-gray-500 uppercase text-xs mb-2">Imagen Principal</h4>
                                <ImageUploader 
                                    value={p.image} 
                                    onChange={(val) => handleEdit(idx, 'image', val)} 
                                    recommendedSize="800x600px"
                                />
                            </div>

                            <div className="lg:col-span-2 space-y-4">
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Título del Proyecto</label>
                                        <input className="w-full font-bold border p-2 rounded text-lg" value={p.title} onChange={(e) => handleEdit(idx, 'title', e.target.value)} />
                                     </div>
                                     <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Categoría</label>
                                        <input className="w-full border p-2 rounded" value={p.category} onChange={(e) => handleEdit(idx, 'category', e.target.value)} />
                                     </div>
                                 </div>

                                 {/* NEW FIELDS */}
                                 <div>
                                     <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Descripción Detallada (Sobre el Proyecto)</label>
                                     <textarea 
                                        className="w-full border p-2 rounded text-sm h-24" 
                                        value={p.description || ''} 
                                        onChange={(e) => handleEdit(idx, 'description', e.target.value)}
                                        placeholder="Descripción completa del proyecto..." 
                                     />
                                 </div>
                                 
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1 flex items-center"><User size={12} className="mr-1"/> Cliente</label>
                                        <input className="w-full border p-2 rounded text-sm" value={p.client || ''} onChange={(e) => handleEdit(idx, 'client', e.target.value)} placeholder="Ej: Cliente Confidencial" />
                                     </div>
                                     <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1 flex items-center"><MapPin size={12} className="mr-1"/> Ubicación</label>
                                        <input className="w-full border p-2 rounded text-sm" value={p.location || ''} onChange={(e) => handleEdit(idx, 'location', e.target.value)} placeholder="Ej: Santo Domingo, RD" />
                                     </div>
                                 </div>

                                 <div>
                                     <label className="block text-xs font-bold text-gray-500 uppercase mb-1 flex items-center"><FileText size={12} className="mr-1"/> Alcance del Trabajo (Lista)</label>
                                     <textarea 
                                        className="w-full border p-2 rounded text-sm bg-gray-50 h-24" 
                                        value={p.scope?.join('\n') || ''} 
                                        onChange={(e) => handleEdit(idx, 'scope', e.target.value.split('\n'))}
                                        placeholder="Un item por línea. Ej:&#10;Instalación de ductos&#10;Supervisión de obra&#10;Pruebas de calidad" 
                                     />
                                 </div>

                                 {/* CLOUDINARY INTEGRATION */}
                                 <div className="bg-blue-50 p-4 rounded-lg border border-blue-150 space-y-3 mt-4">
                                     <h5 className="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1">
                                         <UploadCloud size={14}/> Sincronización Automática con Cloudinary
                                     </h5>
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                         <div>
                                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 font-mono">Cloud Name de Cloudinary</label>
                                            <input 
                                                className="w-full border p-2 rounded text-xs bg-white focus:ring-1 focus:ring-blue-500 outline-none" 
                                                value={p.cloudinaryCloudName || ''} 
                                                onChange={(e) => handleEdit(idx, 'cloudinaryCloudName', e.target.value)} 
                                                placeholder="Ej: dap38hi9l" 
                                            />
                                         </div>
                                         <div>
                                            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1 font-mono">Etiqueta (Tag) de Imágenes</label>
                                            <input 
                                                className="w-full border p-2 rounded text-xs bg-white focus:ring-1 focus:ring-blue-500 outline-none" 
                                                value={p.cloudinaryTag || ''} 
                                                onChange={(e) => handleEdit(idx, 'cloudinaryTag', e.target.value)} 
                                                placeholder="Ej: lopesas" 
                                            />
                                         </div>
                                     </div>
                                     <p className="text-[10px] text-gray-400">
                                         Al guardar estos detalles, cualquier foto subida a Cloudinary con esta etiqueta aparecerá automáticamente en la galería detallada del proyecto de forma dinámica.
                                     </p>
                                 </div>
                            </div>
                        </div>

                        {/* GALLERY EDITOR SECTION */}
                        <div className="border-t pt-4">
                            <h4 className="font-bold text-gray-700 mb-4 flex items-center"><Film size={18} className="mr-2"/> Galería Multimedia</h4>
                            
                            {/* Gallery List */}
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                                {p.gallery?.map((item, gIdx) => (
                                    <div key={gIdx} className="relative group border rounded overflow-hidden aspect-square bg-gray-100">
                                        {item.type === 'video' ? (
                                             <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-800">
                                                 <Film size={24} />
                                             </div>
                                        ) : (
                                            <img src={item.url} alt="Gallery" className="w-full h-full object-cover" />
                                        )}
                                        <button 
                                            onClick={() => removeGalleryItem(idx, gIdx)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                        >
                                            <X size={12} />
                                        </button>
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] p-1 truncate">
                                            {item.type === 'video' ? 'VIDEO' : 'IMG'}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Add Item Area */}
                            <div className="bg-gray-50 p-6 rounded border space-y-6">
                                {/* Option 1: Batch Upload (Primary) */}
                                <div>
                                    <h5 className="text-xs font-bold uppercase mb-2 flex items-center gap-2"><UploadCloud size={14}/> Subida Rápida (Múltiples Fotos)</h5>
                                    <label className={`
                                        block w-full border-2 border-dashed border-blue-300 bg-blue-50/50 hover:bg-blue-50 p-6 rounded cursor-pointer transition text-center
                                        ${batchUploading ? 'opacity-50 pointer-events-none' : ''}
                                    `}>
                                        <input 
                                            type="file" 
                                            multiple 
                                            accept="image/*" 
                                            className="hidden" 
                                            onChange={(e) => handleBatchUpload(e, idx)}
                                        />
                                        <div className="flex flex-col items-center justify-center text-blue-600">
                                            {batchUploading ? <Loader2 size={32} className="animate-spin mb-2"/> : <FolderPlus size={32} className="mb-2"/>}
                                            <span className="font-bold text-sm">
                                                {batchUploading ? 'Subiendo imágenes...' : 'Click para seleccionar múltiples fotos'}
                                            </span>
                                            <span className="text-xs text-blue-400 mt-1">Se agregarán automáticamente a este proyecto. Recuerda Guardar Cambios.</span>
                                        </div>
                                    </label>
                                </div>

                                <div className="border-t border-gray-200"></div>

                                {/* Option 2: Single Item (For Video or Manual URL) */}
                                <div>
                                    <h5 className="text-xs font-bold uppercase mb-2 text-gray-500">O Agregar Manualmente (Video/URL)</h5>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                        <select 
                                            className="border p-2 rounded text-sm"
                                            value={newItem.type}
                                            onChange={(e) => setNewItem({...newItem, type: e.target.value as 'image' | 'video'})}
                                        >
                                            <option value="image">Imagen</option>
                                            <option value="video">Video (URL)</option>
                                        </select>
                                        
                                        <div className="md:col-span-2">
                                            {newItem.type === 'image' ? (
                                                <ImageUploader 
                                                    value={newItem.url} 
                                                    onChange={(val) => setNewItem({...newItem, url: val})} 
                                                    recommendedSize="1200x800px (Proyecto)"
                                                />
                                            ) : (
                                                <input 
                                                    className="w-full border p-2 rounded text-sm" 
                                                    placeholder="Link YouTube / Vimeo"
                                                    value={newItem.url}
                                                    onChange={(e) => setNewItem({...newItem, url: e.target.value})}
                                                />
                                            )}
                                        </div>
                                        
                                        <button 
                                            onClick={() => addGalleryItem(idx)}
                                            disabled={!newItem.url}
                                            className="bg-gray-700 text-white rounded px-3 py-2 text-sm font-bold disabled:opacity-50 hover:bg-gray-800 self-start"
                                        >
                                            + Agregar Uno
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const PageHeadersEditor = () => {
    const { pageHeaders, updateData, saveToDb } = useData();
    const keys = Object.keys(pageHeaders) as PageHeaderKeys[];
    
    // Page Header Map for nice labels
    const labels: Record<string, string> = {
        about: 'Nosotros',
        services: 'Servicios',
        projects: 'Proyectos',
        blog: 'Blog / Noticias',
        contact: 'Contacto'
    };

    const handleEdit = (key: PageHeaderKeys, field: keyof PageHeaderData, value: string) => {
        const newData = { ...pageHeaders };
        newData[key] = { ...newData[key], [field]: value };
        updateData('pageHeaders', newData);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center bg-white p-4 rounded shadow-sm border">
                <h2 className="text-2xl font-bold">Encabezados de Páginas</h2>
                <SaveButton onSave={() => saveToDb('pageHeaders', pageHeaders)} />
            </div>
            {keys.map((key) => (
                <div key={key} className="bg-white p-6 rounded shadow border border-gray-200">
                    <h4 className="font-bold text-lg mb-4 text-primary capitalize flex items-center">
                        <Monitor size={18} className="mr-2"/> Página: {labels[key] || key}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Título Principal</label>
                                <input 
                                    className="w-full font-bold border p-2 rounded" 
                                    value={pageHeaders[key].title} 
                                    onChange={(e) => handleEdit(key, 'title', e.target.value)} 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Subtítulo / Descripción</label>
                                    <textarea 
                                        className="w-full border p-2 rounded text-sm" 
                                        rows={3}
                                        value={pageHeaders[key].subtitle} 
                                        onChange={(e) => handleEdit(key, 'subtitle', e.target.value)} 
                                    />
                                </div>
                             </div>
                             <div>
                                 <ImageUploader 
                                    value={pageHeaders[key].bgImage} 
                                    onChange={(val) => handleEdit(key, 'bgImage', val)} 
                                    recommendedSize="1920x600px"
                                 />
                             </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    
    export const BlogEditor = () => {
        const { blogPosts, updateData, saveToDb } = useData();
    
        const handleEdit = (idx: number, field: string, value: any) => {
            const newData = [...blogPosts];
            newData[idx] = { ...newData[idx], [field]: value };
            updateData('blogPosts', newData);
        };
    
        const handleDelete = (idx: number) => {
            if(confirm('¿Eliminar artículo?')) updateData('blogPosts', blogPosts.filter((_, i) => i !== idx));
        };
    
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center bg-white p-4 rounded shadow-sm border">
                    <h2 className="text-2xl font-bold">Blog y Noticias</h2>
                    <div className="flex gap-2">
                        <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600 transition" onClick={() => {
                            updateData('blogPosts', [...blogPosts, { id: Date.now(), title: 'Nuevo Artículo', category: 'General', image: '', date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }), excerpt: '' }]);
                        }}><Plus size={16} className="mr-2"/> Nuevo Artículo</button>
                        <SaveButton onSave={() => saveToDb('blogPosts', blogPosts)} />
                    </div>
                </div>
                {blogPosts.map((post, idx) => (
                    <div key={post.id} className="bg-white p-6 rounded shadow border relative">
                        <button className="absolute top-4 right-4 text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full z-10" onClick={() => handleDelete(idx)}><Trash2 size={18}/></button>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                 <ImageUploader 
                                    value={post.image} 
                                    onChange={(val) => handleEdit(idx, 'image', val)} 
                                    recommendedSize="800x600px"
                                 />
                            </div>
                            <div className="md:col-span-2 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Título</label>
                                    <input className="w-full font-bold border p-2 rounded" value={post.title} onChange={(e) => handleEdit(idx, 'title', e.target.value)} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Categoría</label>
                                        <input className="w-full border p-2 rounded" value={post.category} onChange={(e) => handleEdit(idx, 'category', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Fecha</label>
                                        <input className="w-full border p-2 rounded" value={post.date} onChange={(e) => handleEdit(idx, 'date', e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Extracto / Resumen</label>
                                    <textarea className="w-full border p-2 rounded text-sm" rows={3} value={post.excerpt} onChange={(e) => handleEdit(idx, 'excerpt', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    
    export const FAQEditor = () => {
        const { faqItems, updateData, saveToDb } = useData();
    
        const handleEdit = (idx: number, field: string, value: any) => {
            const newData = [...faqItems];
            newData[idx] = { ...newData[idx], [field]: value };
            updateData('faqItems', newData);
        };
    
        const handleDelete = (idx: number) => {
            if(confirm('¿Eliminar pregunta?')) updateData('faqItems', faqItems.filter((_, i) => i !== idx));
        };
    
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center bg-white p-4 rounded shadow-sm border">
                    <h2 className="text-2xl font-bold">Preguntas Frecuentes (FAQ)</h2>
                    <div className="flex gap-2">
                        <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600 transition" onClick={() => {
                            updateData('faqItems', [...faqItems, { id: Date.now(), question: '¿Nueva Pregunta?', answer: 'Respuesta...' }]);
                        }}><Plus size={16} className="mr-2"/> Pregunta</button>
                        <SaveButton onSave={() => saveToDb('faqItems', faqItems)} />
                    </div>
                </div>
                <div className="space-y-4">
                    {faqItems.map((item, idx) => (
                        <div key={item.id} className="bg-white p-4 rounded shadow border flex gap-4 items-start">
                            <div className="flex-grow space-y-3">
                                <input 
                                    className="w-full font-bold border p-2 rounded focus:border-primary outline-none" 
                                    value={item.question} 
                                    onChange={(e) => handleEdit(idx, 'question', e.target.value)} 
                                    placeholder="Pregunta"
                                />
                                <textarea 
                                    className="w-full border p-2 rounded text-sm focus:border-primary outline-none" 
                                    rows={2}
                                    value={item.answer} 
                                    onChange={(e) => handleEdit(idx, 'answer', e.target.value)}
                                    placeholder="Respuesta"
                                />
                            </div>
                            <button className="text-red-500 hover:text-red-700 p-2" onClick={() => handleDelete(idx)}>
                                <Trash2 size={18}/>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
