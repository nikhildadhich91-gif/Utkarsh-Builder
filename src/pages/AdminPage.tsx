import React, { useState, useEffect } from 'react';

import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  type User 
} from 'firebase/auth';
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc,
  query,
  orderBy,
  writeBatch
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { assets } from '../lib/cloudinary';
import { LogIn, LogOut, Plus, Trash2, Database, Upload, RefreshCw, Edit, GripVertical, X, Eye, Download, Maximize2, Move } from 'lucide-react';

interface ProjectData {
  number: string;
  name: string;
  category: string;
  location: string;
  description: string;
  tag: 'residential' | 'commercial' | 'development' | 'industrial';
  images: {
    col1_1: string;
    col1_2: string;
    col2: string;
    col2_extra?: string;
  };
  gallery?: string[];
}

export const AdminPage: React.FC = () => {
  useEffect(() => {
    document.title = "Admin Dashboard | Utkarsh Builder";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Utkarsh Builder Internal Admin Panel.');
    }
  }, []);
  
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(() => !!auth);
  
  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Projects State
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Upload Form State
  const [formData, setFormData] = useState({
    number: '',
    name: '',
    category: '',
    location: '',
    tag: 'residential' as 'residential' | 'commercial' | 'development' | 'industrial',
    description: '',
  });

  // Selected Files State
  const [files, setFiles] = useState<{
    col2: File | null;
    col1_1: File | null;
    col1_2: File | null;
  }>({
    col2: null,
    col1_1: null,
    col1_2: null,
  });

  const [uploadProgress, setUploadProgress] = useState<{
    col2: string;
    col1_1: string;
    col1_2: string;
  }>({
    col2: '',
    col1_1: '',
    col1_2: '',
  });

  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryProgress, setGalleryProgress] = useState<string>('');
  const [currentGalleryUrls, setCurrentGalleryUrls] = useState<string[]>([]);
  const [customUrlInput, setCustomUrlInput] = useState('');

  const [mainImages, setMainImages] = useState<{
    col2: string;
    col1_1: string;
    col1_2: string;
  }>({
    col2: '',
    col1_1: '',
    col1_2: '',
  });

  const [previewModal, setPreviewModal] = useState<{ url: string; title: string } | null>(null);

  const downloadImage = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename || 'project-image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Image download error: ", err);
      window.open(url, '_blank');
    }
  };

  const [editingProjectNumber, setEditingProjectNumber] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Gallery Drag & Drop Reordering State
  const [galleryDragOverIndex, setGalleryDragOverIndex] = useState<number | null>(null);
  const [draggedGalleryIndex, setDraggedGalleryIndex] = useState<number | null>(null);
  const [isGalleryOrganizerOpen, setIsGalleryOrganizerOpen] = useState(false);

  const handleGalleryDragStart = (e: React.DragEvent, index: number) => {
    setDraggedGalleryIndex(index);
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleGalleryDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (galleryDragOverIndex !== index) {
      setGalleryDragOverIndex(index);
    }
  };

  const handleGalleryDragLeave = () => {
    setGalleryDragOverIndex(null);
  };

  const handleGalleryDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    setGalleryDragOverIndex(null);
    setDraggedGalleryIndex(null);
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (isNaN(sourceIndex) || sourceIndex === targetIndex) return;

    setCurrentGalleryUrls(prev => {
      const newList = [...prev];
      const [movedItem] = newList.splice(sourceIndex, 1);
      newList.splice(targetIndex, 0, movedItem);
      return newList;
    });
  };

  const fetchProjects = async () => {
    if (!db) return;
    setProjectsLoading(true);
    try {
      const q = query(collection(db!, 'projects'), orderBy('number', 'asc'));
      const querySnapshot = await getDocs(q);
      const list: ProjectData[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data() as ProjectData;
        if (data.name === 'Barfiwala Sweets') {
          data.images = {
            ...data.images,
            col1_1: assets.projects.barfiwalaCol1_1,
            col1_2: assets.projects.barfiwalaCol1_2,
            col2: assets.projects.barfiwalaCol2,
            col2_extra: assets.projects.barfiwalaCol2Extra
          };
        }
        list.push(data);
      });
      setProjects(list);
    } catch (err) {
      console.error("Error fetching projects from Firestore: ", err);
    } finally {
      setProjectsLoading(false);
    }
  };

  useEffect(() => {
    if (!auth) {
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser) {
        fetchProjects();
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setAuthError('');
    if (!auth) {
      setAuthError('Authentication service is not available. Please verify Vercel environment variables.');
      setLoginLoading(false);
      return;
    }
    try {
      await signInWithEmailAndPassword(auth!, email, password);
    } catch (err) {
      const error = err as Error;
      setAuthError(error.message || 'Invalid email or password.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      if (auth) {
        await signOut(auth);
      }
      setProjects([]);
    } catch (err) {
      console.error("Logout error: ", err);
    }
  };

  const uploadToCloudinary = async (file: File, inputName?: 'col2' | 'col1_1' | 'col1_2'): Promise<string> => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'popyh4wz';
    const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ojqbtpol';

    if (inputName) {
      setUploadProgress(prev => ({ ...prev, [inputName]: 'Uploading...' }));
    }
    
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const clData = new FormData();
    clData.append('file', file);
    clData.append('upload_preset', preset);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: clData
      });
      const data = await response.json();
      if (!response.ok) {
        const errorMsg = data.error?.message || response.statusText || 'Unknown error';
        throw new Error(`Cloudinary upload failed: ${errorMsg}`);
      }
      if (inputName) {
        setUploadProgress(prev => ({ ...prev, [inputName]: 'Uploaded!' }));
      }
      return data.secure_url;
    } catch (err) {
      if (inputName) {
        setUploadProgress(prev => ({ ...prev, [inputName]: 'Failed!' }));
      }
      throw err;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'col2' | 'col1_1' | 'col1_2') => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFiles(prev => ({ ...prev, [fieldName]: selectedFile }));
      const blobUrl = URL.createObjectURL(selectedFile);
      setMainImages(prev => ({ ...prev, [fieldName]: blobUrl }));
      setUploadProgress(prev => ({ ...prev, [fieldName]: 'Ready to upload' }));
    }
  };

  const handleSetMainImageUrl = (fieldName: 'col2' | 'col1_1' | 'col1_2', url: string) => {
    setMainImages(prev => ({ ...prev, [fieldName]: url }));
    setFiles(prev => ({ ...prev, [fieldName]: null }));
    setUploadProgress(prev => ({ ...prev, [fieldName]: '' }));
  };

  const handleDeleteMainImage = (fieldName: 'col2' | 'col1_1' | 'col1_2') => {
    setMainImages(prev => ({ ...prev, [fieldName]: '' }));
    setFiles(prev => ({ ...prev, [fieldName]: null }));
    setUploadProgress(prev => ({ ...prev, [fieldName]: '' }));
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setGalleryFiles(Array.from(e.target.files));
      setGalleryProgress(`${e.target.files.length} images selected`);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentProj = editingProjectNumber ? projects.find(p => p.number === editingProjectNumber) : null;

    if (!editingProjectNumber && (!files.col2 && !mainImages.col2 || !files.col1_1 && !mainImages.col1_1 || !files.col1_2 && !mainImages.col1_2)) {
      alert("Please provide all 3 required images.");
      return;
    }

    setActionLoading(true);
    try {
      let urlCol2 = '';
      let urlCol1_1 = '';
      let urlCol1_2 = '';

      // 1. Upload or reuse main files
      if (files.col2) {
        urlCol2 = await uploadToCloudinary(files.col2, 'col2');
      } else if (mainImages.col2) {
        urlCol2 = mainImages.col2;
      } else if (currentProj) {
        urlCol2 = currentProj.images.col2;
      } else {
        alert("Main Showcase Image (Col 2) is required.");
        setActionLoading(false);
        return;
      }

      if (files.col1_1) {
        urlCol1_1 = await uploadToCloudinary(files.col1_1, 'col1_1');
      } else if (mainImages.col1_1) {
        urlCol1_1 = mainImages.col1_1;
      } else if (currentProj) {
        urlCol1_1 = currentProj.images.col1_1;
      } else {
        alert("Detail View 1 (Col 1_1) is required.");
        setActionLoading(false);
        return;
      }

      if (files.col1_2) {
        urlCol1_2 = await uploadToCloudinary(files.col1_2, 'col1_2');
      } else if (mainImages.col1_2) {
        urlCol1_2 = mainImages.col1_2;
      } else if (currentProj) {
        urlCol1_2 = currentProj.images.col1_2;
      } else {
        alert("Detail View 2 (Col 1_2) is required.");
        setActionLoading(false);
        return;
      }

      // 2. Upload additional gallery files sequentially (if any) and append to currentGalleryUrls
      const uploadedUrls: string[] = [];
      if (galleryFiles.length > 0) {
        setGalleryProgress(`Uploading 0/${galleryFiles.length}...`);
        for (let i = 0; i < galleryFiles.length; i++) {
          setGalleryProgress(`Uploading ${i + 1}/${galleryFiles.length}...`);
          const url = await uploadToCloudinary(galleryFiles[i]);
          uploadedUrls.push(url);
        }
        setGalleryProgress('All uploaded!');
      }

      const finalGalleryUrls = [...currentGalleryUrls, ...uploadedUrls];

      // 3. Save document to Firestore
      const projectDoc: ProjectData = {
        number: formData.number,
        name: formData.name,
        category: formData.category,
        location: formData.location,
        description: formData.description,
        tag: formData.tag,
        images: {
          col2: urlCol2,
          col1_1: urlCol1_1,
          col1_2: urlCol1_2,
          ...(currentProj?.images?.col2_extra ? { col2_extra: currentProj.images.col2_extra } : {})
        },
        gallery: finalGalleryUrls
      };

      if (!db) {
        alert("Database connection is not available.");
        return;
      }

      // If document number ID was changed during edit, clean up the old document reference
      if (editingProjectNumber && editingProjectNumber !== formData.number) {
        await deleteDoc(doc(db!, 'projects', editingProjectNumber));
      }

      await setDoc(doc(db!, 'projects', formData.number), projectDoc);
      alert(`Project ${formData.name} saved successfully!`);
      
      // Reset Form State
      setFormData({
        number: '',
        name: '',
        category: '',
        location: '',
        tag: 'residential',
        description: ''
      });
      setFiles({ col2: null, col1_1: null, col1_2: null });
      setUploadProgress({ col2: '', col1_1: '', col1_2: '' });
      setGalleryFiles([]);
      setGalleryProgress('');
      setEditingProjectNumber(null);
      setCurrentGalleryUrls([]);
      setCustomUrlInput('');
      fetchProjects();
    } catch (err) {
      const error = err as Error;
      console.error(error);
      alert(`Submission failed: ${error.message || error}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProject = async (projectNumber: string) => {
    if (!window.confirm(`Are you sure you want to delete project ${projectNumber}?`)) {
      return;
    }
    if (!db) {
      alert("Database connection is not available.");
      return;
    }
    setActionLoading(true);
    try {
      await deleteDoc(doc(db!, 'projects', projectNumber));
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Deletion failed.");
      setActionLoading(false);
    }
  };

  // Drag and Drop Rearrangement Handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = async (e: React.DragEvent, targetIndex: number) => {
    setDragOverIndex(null);
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (isNaN(sourceIndex) || sourceIndex === targetIndex) return;

    setActionLoading(true);
    try {
      const newList = [...projects];
      const [draggedItem] = newList.splice(sourceIndex, 1);
      newList.splice(targetIndex, 0, draggedItem);

      // Re-assign sorted order numbers (e.g. '01', '02', '03')
      const updatedList = newList.map((item, idx) => {
        const formattedNum = (idx + 1).toString().padStart(2, '0');
        return {
          ...item,
          number: formattedNum
        };
      });

      if (!db) {
        alert("Database connection is not available.");
        return;
      }

      // WriteBatch: wipe existing and write updated order to keep document IDs in sync
      const querySnapshot = await getDocs(collection(db!, 'projects'));
      const batch = writeBatch(db!);
      
      // Delete old documents
      querySnapshot.forEach((docSnap) => {
        batch.delete(docSnap.ref);
      });

      // Write new documents with correct numbers
      updatedList.forEach((proj) => {
        const docRef = doc(db!, 'projects', proj.number);
        batch.set(docRef, proj);
      });

      await batch.commit();
      setProjects(updatedList);
    } catch (err) {
      console.error("Failed to rearrange projects: ", err);
      alert("Failed to save rearranged order to database.");
      fetchProjects(); // Revert local state to matches in database
    } finally {
      setActionLoading(false);
    }
  };

  // Edit Handlers
  const startEditProject = (proj: ProjectData) => {
    setEditingProjectNumber(proj.number);
    setFormData({
      number: proj.number,
      name: proj.name,
      category: proj.category,
      location: proj.location,
      tag: proj.tag,
      description: proj.description,
    });
    setMainImages({
      col2: proj.images?.col2 || '',
      col1_1: proj.images?.col1_1 || '',
      col1_2: proj.images?.col1_2 || '',
    });
    setFiles({ col2: null, col1_1: null, col1_2: null });
    setUploadProgress({ col2: '', col1_1: '', col1_2: '' });
    setGalleryFiles([]);
    setCurrentGalleryUrls(proj.gallery || []);
    setGalleryProgress(proj.gallery && proj.gallery.length > 0 ? `${proj.gallery.length} images in explore page` : '');
  };

  const cancelEditProject = () => {
    setEditingProjectNumber(null);
    setFormData({
      number: '',
      name: '',
      category: '',
      location: '',
      tag: 'residential',
      description: '',
    });
    setMainImages({ col2: '', col1_1: '', col1_2: '' });
    setFiles({ col2: null, col1_1: null, col1_2: null });
    setUploadProgress({ col2: '', col1_1: '', col1_2: '' });
    setGalleryFiles([]);
    setGalleryProgress('');
    setCurrentGalleryUrls([]);
    setCustomUrlInput('');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FAF7F5] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#C92C15]/20 border-t-[#C92C15] rounded-full animate-spin mb-4" />
        <span className="text-xs uppercase tracking-widest text-[#6F6F6F] font-bold">Verifying Session...</span>
      </div>
    );
  }

  // --- LOGIN PANEL VIEW ---
  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAF7F5] flex items-center justify-center pt-28 pb-12 px-6 select-none relative overflow-hidden">
        {/* Decorative Grid and Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,44,21,0.04),transparent)] pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(to_left,rgba(0,0,0,0.01),transparent)] pointer-events-none" />
        
        <div className="w-full max-w-md bg-white border border-black/5 p-8 md:p-10 rounded-[30px] shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase block mb-2">Utkarsh Builder</span>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1B1B1B] tracking-tight">Super Admin Panel</h2>
            <p className="text-xs text-[#6F6F6F] mt-2">Enter credentials to manage portfolio projects</p>
          </div>

          {authError && (
            <div className="mb-6 p-4 rounded-xl bg-[#C92C15]/5 border border-[#C92C15]/20 text-[#C92C15] text-xs leading-relaxed">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                className="peer block w-full px-0 py-3 text-base text-[#111111] bg-transparent border-b border-black/20 focus:outline-none focus:border-[#C92C15] transition-colors font-bold"
              />
              <label className="absolute left-0 top-3 text-[#333333] text-sm transition-all duration-300 pointer-events-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6 peer-focus:text-[#C92C15] peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:-translate-y-6 font-extrabold">
                Email Address
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                className="peer block w-full px-0 py-3 text-base text-[#111111] bg-transparent border-b border-black/20 focus:outline-none focus:border-[#C92C15] transition-colors font-bold"
              />
              <label className="absolute left-0 top-3 text-[#333333] text-sm transition-all duration-300 pointer-events-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6 peer-focus:text-[#C92C15] peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:-translate-y-6 font-extrabold">
                Password
              </label>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-[#C92C15] hover:bg-[#D43B13] disabled:bg-[#C92C15]/50 text-white transition-all duration-300 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loginLoading ? 'Authenticating...' : 'Sign In'}</span>
              <LogIn className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- LOGGED-IN ADMIN DASHBOARD VIEW ---
  return (
    <div className="min-h-screen bg-[#FAF7F5] text-[#1B1B1B] pt-28 pb-12 px-6 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-black/5">
          <div>
            <span className="text-[#C92C15] text-xs font-bold tracking-[0.2em] uppercase block mb-1">Administrative Workspace</span>
            <h1 className="text-3xl font-semibold tracking-tight text-[#1B1B1B]">Portfolio Management Dashboard</h1>
            <p className="text-xs text-[#6F6F6F]">Logged in as: <span className="font-semibold">{user.email}</span></p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 border border-black/10 hover:border-[#C92C15] hover:text-[#C92C15] hover:bg-[#C92C15]/5 transition-all px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#1B1B1B] cursor-pointer"
          >
            <span>Sign Out</span>
            <LogOut className="h-4 w-4" />
          </button>
        </div>

        {/* Utilities Bar */}
        <div className="mb-10 p-5 rounded-2xl bg-white border border-black/5 flex flex-wrap gap-4 items-center justify-between shadow-sm">
          <div>
            <h3 className="font-semibold text-sm text-[#1B1B1B]">Quick Database Utilities</h3>
            <p className="text-xs text-[#6F6F6F]">Fetch latest active project snapshots from database</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchProjects}
              disabled={projectsLoading || actionLoading}
              className="inline-flex items-center gap-1.5 border border-black/10 hover:bg-[#FAF7F5] px-4 py-2.5 rounded-lg text-xs font-semibold cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${projectsLoading ? 'animate-spin' : ''}`} />
              <span>Refresh List</span>
            </button>
          </div>
        </div>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Create Project Form (5 Columns) */}
          <div className="lg:col-span-5 bg-white border border-black/5 p-6 md:p-8 rounded-[30px] shadow-lg text-left">
            <h2 className="text-xl font-semibold text-[#1B1B1B] tracking-tight mb-6 flex items-center gap-2">
              {editingProjectNumber ? (
                <>
                  <Edit className="h-5 w-5 text-[#C92C15]" />
                  <span>Edit Project: {editingProjectNumber}</span>
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5 text-[#C92C15]" />
                  <span>Upload New Project</span>
                </>
              )}
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Row 1: Number & Name */}
              <div className="grid grid-cols-3 gap-4">
                <div className="relative col-span-1">
                  <input
                    type="text"
                    required
                    maxLength={2}
                    value={formData.number}
                    onChange={(e) => setFormData(prev => ({ ...prev, number: e.target.value }))}
                    placeholder=" "
                    className="peer block w-full px-0 py-2.5 text-base text-[#111111] bg-transparent border-b border-black/20 focus:outline-none focus:border-[#C92C15] transition-colors font-bold"
                  />
                  <label className="absolute left-0 top-2.5 text-[#333333] text-xs transition-all duration-300 pointer-events-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-5 peer-focus:text-[#C92C15] peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:-translate-y-5 font-extrabold">
                    No. (e.g. 08) *
                  </label>
                </div>
                <div className="relative col-span-2">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder=" "
                    className="peer block w-full px-0 py-2.5 text-base text-[#111111] bg-transparent border-b border-black/20 focus:outline-none focus:border-[#C92C15] transition-colors font-bold"
                  />
                  <label className="absolute left-0 top-2.5 text-[#333333] text-xs transition-all duration-300 pointer-events-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-5 peer-focus:text-[#C92C15] peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:-translate-y-5 font-extrabold">
                    Project Name *
                  </label>
                </div>
              </div>

              {/* Row 2: Category & Location */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    placeholder=" "
                    className="peer block w-full px-0 py-2.5 text-base text-[#111111] bg-transparent border-b border-black/20 focus:outline-none focus:border-[#C92C15] transition-colors font-bold"
                  />
                  <label className="absolute left-0 top-2.5 text-[#333333] text-xs transition-all duration-300 pointer-events-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-5 peer-focus:text-[#C92C15] peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:-translate-y-5 font-extrabold">
                    Category (e.g. Retail) *
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder=" "
                    className="peer block w-full px-0 py-2.5 text-base text-[#111111] bg-transparent border-b border-black/20 focus:outline-none focus:border-[#C92C15] transition-colors font-bold"
                  />
                  <label className="absolute left-0 top-2.5 text-[#333333] text-xs transition-all duration-300 pointer-events-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-5 peer-focus:text-[#C92C15] peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:-translate-y-5 font-extrabold">
                    Location (e.g. MI Road) *
                  </label>
                </div>
              </div>

              {/* Row 3: Tag / Sector Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xxs font-extrabold text-[#333333] uppercase">Portfolio Division Tag *</label>
                <select
                  value={formData.tag}
                  onChange={(e) => setFormData(prev => ({ ...prev, tag: e.target.value as ProjectData['tag'] }))}
                  className="text-sm font-semibold text-[#111111] border-b border-black/20 bg-transparent py-2.5 focus:outline-none focus:border-[#C92C15] transition-colors"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="development">Development</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>

              {/* Row 4: Description textarea */}
              <div className="relative">
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder=" "
                  className="peer block w-full px-0 py-2 text-base text-[#111111] bg-transparent border-b border-black/20 focus:outline-none focus:border-[#C92C15] transition-colors resize-none font-medium leading-relaxed"
                />
                <label className="absolute left-0 top-2 text-[#333333] text-xs transition-all duration-300 pointer-events-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-5 peer-focus:text-[#C92C15] peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:-translate-y-5 font-extrabold">
                  Detailed Project Description *
                </label>
              </div>

              {/* IMAGE SELECTION BLOCK */}
              <div className="space-y-4 pt-4 border-t border-black/5">
                <span className="text-xs uppercase tracking-widest text-[#6F6F6F] font-bold block mb-2">
                  Showcase Images (View, Download, Replace & Delete)
                </span>

                {/* Main 3 Showcase Images Fields (col2, col1_1, col1_2) */}
                {(['col2', 'col1_1', 'col1_2'] as const).map((fieldName) => {
                  const labels: Record<'col2' | 'col1_1' | 'col1_2', string> = {
                    col2: 'Main Showcase Image (Col 2)',
                    col1_1: 'Detail View 1 (Col 1_1)',
                    col1_2: 'Detail View 2 (Col 1_2)',
                  };
                  const imgUrl = mainImages[fieldName];
                  const fileInputId = `file-input-${fieldName}`;

                  return (
                    <div key={fieldName} className="p-3.5 border border-black/10 rounded-2xl bg-[#FAF7F5] space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xxs font-extrabold text-[#111111] uppercase tracking-wider">
                          {labels[fieldName]} {!editingProjectNumber && '*'}
                        </label>
                        {uploadProgress[fieldName] && (
                          <span className="text-xxs font-semibold bg-[#C92C15]/10 text-[#C92C15] px-2 py-0.5 rounded">
                            {uploadProgress[fieldName]}
                          </span>
                        )}
                      </div>

                      {imgUrl ? (
                        <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-black/10 shadow-sm">
                          {/* Thumbnail preview */}
                          <div 
                            onClick={() => setPreviewModal({ url: imgUrl, title: `${formData.name || 'Project'} - ${labels[fieldName]}` })}
                            className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-black/10 cursor-pointer group relative bg-gray-100"
                            title="Click to view full size"
                          >
                            <img src={imgUrl} alt={labels[fieldName]} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                              <Eye className="h-4 w-4" />
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-[#111111] truncate">{labels[fieldName]}</p>
                            <p className="text-[10px] text-[#6F6F6F] truncate">{imgUrl}</p>
                          </div>

                          {/* Action Buttons: View, Download, Replace, Delete */}
                          <div className="flex items-center gap-1 shrink-0">
                            {/* View */}
                            <button
                              type="button"
                              onClick={() => setPreviewModal({ url: imgUrl, title: `${formData.name || 'Project'} - ${labels[fieldName]}` })}
                              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
                              title="View Image"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </button>
                            {/* Download */}
                            <button
                              type="button"
                              onClick={() => downloadImage(imgUrl, `${(formData.name || 'project').toLowerCase().replace(/\s+/g, '-')}-${fieldName}.jpg`)}
                              className="p-2 rounded-lg bg-gray-100 hover:bg-[#C92C15] hover:text-white text-gray-700 transition-colors cursor-pointer"
                              title="Download Image"
                            >
                              <Download className="h-3.5 w-3.5" />
                            </button>
                            {/* Replace */}
                            <button
                              type="button"
                              onClick={() => document.getElementById(fileInputId)?.click()}
                              className="p-2 rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 transition-colors cursor-pointer"
                              title="Replace Image"
                            >
                              <RefreshCw className="h-3.5 w-3.5" />
                            </button>
                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => handleDeleteMainImage(fieldName)}
                              className="p-2 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors cursor-pointer"
                              title="Delete Image"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          {/* Hidden File Input for Replace */}
                          <input
                            id={fileInputId}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, fieldName)}
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row items-center gap-2">
                          <input
                            id={fileInputId}
                            type="file"
                            accept="image/*"
                            required={!editingProjectNumber}
                            onChange={(e) => handleFileChange(e, fieldName)}
                            className="text-xs text-[#6F6F6F] border border-black/10 rounded-lg p-1.5 w-full bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const url = prompt(`Paste image URL for ${labels[fieldName]}:`);
                              if (url && url.trim()) {
                                handleSetMainImageUrl(fieldName, url.trim());
                              }
                            }}
                            className="text-xs font-bold text-[#C92C15] bg-[#C92C15]/10 hover:bg-[#C92C15]/20 px-3 py-2 rounded-lg shrink-0 cursor-pointer transition-colors"
                          >
                            Paste URL
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Additional Explore Gallery Images (Optional Multiple) */}
                <div className="flex flex-col gap-1 pt-2 border-t border-black/5">
                  <label className="text-xxs font-extrabold text-[#333333] uppercase">Explore Gallery Images (Optional Multiple)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryChange}
                      className="text-xs text-[#6F6F6F] border border-black/10 rounded-lg p-1.5 w-full bg-[#FAF7F5]"
                    />
                    {galleryProgress && (
                      <span className="text-xxs font-semibold bg-[#C92C15]/10 text-[#C92C15] px-2 py-1 rounded shrink-0">
                        {galleryProgress}
                      </span>
                    )}
                  </div>
                </div>

                {/* Manual Image URL Input */}
                <div className="flex flex-col gap-1.5 pt-2">
                  <label className="text-xxs font-extrabold text-[#333333] uppercase">Add Image URL manually</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Paste image URL here..."
                      value={customUrlInput}
                      onChange={(e) => setCustomUrlInput(e.target.value)}
                      className="text-xs text-[#111111] border border-black/15 focus:border-[#C92C15] focus:outline-none rounded-lg p-2 flex-grow bg-white font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (customUrlInput.trim()) {
                          setCurrentGalleryUrls(prev => [...prev, customUrlInput.trim()]);
                          setCustomUrlInput('');
                        }
                      }}
                      className="bg-[#1B1B1B] hover:bg-[#C92C15] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Add URL
                    </button>
                  </div>
                </div>

                {/* Active Explore Page Image Gallery Manager (Drag & Drop Reordering) */}
                <div className="flex flex-col gap-2 pt-3 border-t border-black/5">
                  <div className="flex items-center justify-between">
                    <label className="text-xxs font-extrabold text-[#333333] uppercase">
                      Explore Gallery ({currentGalleryUrls.length} items)
                    </label>
                    {currentGalleryUrls.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setIsGalleryOrganizerOpen(true)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1B1B1B] hover:bg-[#C92C15] px-3 py-1.5 rounded-full transition-all duration-300 shadow cursor-pointer"
                      >
                        <Maximize2 className="h-3.5 w-3.5" />
                        <span>Organize Full Screen</span>
                      </button>
                    )}
                  </div>

                  {currentGalleryUrls.length > 0 ? (
                    <div className="p-3 bg-[#0A0A0A] rounded-2xl border border-white/10 text-white max-h-[300px] overflow-y-auto scrollbar-thin">
                      <div className="flex items-center justify-between mb-2 px-1 text-[10px] text-white/60 font-semibold">
                        <span className="flex items-center gap-1"><Move className="h-3 w-3 text-[#C92C15]" /> Drag & drop cards to reorder</span>
                        <span>Click preview or delete to manage</span>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {currentGalleryUrls.map((url, idx) => {
                          const isVideo = url.toLowerCase().endsWith('.mp4') || url.toLowerCase().endsWith('.webm') || url.toLowerCase().endsWith('.mov');
                          const isTarget = galleryDragOverIndex === idx;
                          const isDragging = draggedGalleryIndex === idx;

                          return (
                            <div
                              key={url + idx}
                              draggable
                              onDragStart={(e) => handleGalleryDragStart(e, idx)}
                              onDragOver={(e) => handleGalleryDragOver(e, idx)}
                              onDragLeave={handleGalleryDragLeave}
                              onDrop={(e) => handleGalleryDrop(e, idx)}
                              className={`relative group aspect-[4/3] rounded-xl overflow-hidden bg-white/5 border transition-all duration-300 select-none cursor-grab active:cursor-grabbing ${
                                isTarget ? 'border-[#C92C15] ring-2 ring-[#C92C15] scale-105 bg-[#C92C15]/20 z-20' : 'border-white/10 hover:border-white/30'
                              } ${isDragging ? 'opacity-30' : 'opacity-100'}`}
                            >
                              {/* Order indicator */}
                              <div className="absolute top-1.5 left-1.5 z-20 flex items-center gap-1 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/15 text-white pointer-events-none">
                                <GripVertical className="h-3 w-3 text-white/70" />
                                <span className="text-[9px] font-extrabold text-[#C92C15]">#{idx + 1}</span>
                              </div>

                              {/* Hover actions */}
                              <div className="absolute top-1.5 right-1.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-black/80 backdrop-blur-md p-1 rounded-md border border-white/15">
                                <button
                                  type="button"
                                  onClick={() => setPreviewModal({ url, title: `${formData.name || 'Project'} - Gallery Image #${idx + 1}` })}
                                  className="p-1 rounded hover:bg-white/20 text-white transition-colors cursor-pointer"
                                  title="View Image"
                                >
                                  <Eye className="h-3 w-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => downloadImage(url, `${(formData.name || 'project').toLowerCase().replace(/\s+/g, '-')}-gallery-${idx + 1}.jpg`)}
                                  className="p-1 rounded hover:bg-white/20 text-[#C92C15] transition-colors cursor-pointer"
                                  title="Download"
                                >
                                  <Download className="h-3 w-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setCurrentGalleryUrls(prev => prev.filter((_, i) => i !== idx))}
                                  className="p-1 rounded hover:bg-red-600 text-white transition-colors cursor-pointer"
                                  title="Delete"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>

                              {isVideo ? (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-black text-white p-1">
                                  <span className="text-sm mb-0.5">📹</span>
                                  <span className="text-[8px] font-mono text-white/60">Video</span>
                                </div>
                              ) : (
                                <img
                                  src={url}
                                  alt={`Gallery item ${idx + 1}`}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 border border-dashed border-black/15 rounded-xl bg-[#FAF7F5] text-center text-xs text-[#6F6F6F]">
                      No explore gallery images added yet. Upload files or paste URLs above.
                    </div>
                  )}
                </div>
              </div>

              {/* Submit / Action Buttons */}
              <div className="flex flex-col gap-2 mt-4">
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="w-full bg-[#C92C15] hover:bg-[#D43B13] disabled:bg-[#C92C15]/50 text-white transition-all duration-300 py-3.5 rounded-xl text-sm font-semibold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  {editingProjectNumber ? (
                    <>
                      <span>{actionLoading ? 'Saving changes...' : 'Save Changes'}</span>
                      <RefreshCw className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span>{actionLoading ? 'Uploading details...' : 'Publish Project'}</span>
                      <Upload className="h-4 w-4" />
                    </>
                  )}
                </button>

                {editingProjectNumber && (
                  <button
                    type="button"
                    onClick={cancelEditProject}
                    disabled={actionLoading}
                    className="w-full border border-black/10 hover:bg-[#FAF7F5] transition-all py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel Edit</span>
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right Column: Manage Projects List (7 Columns) */}
          <div className="lg:col-span-7 bg-white border border-black/5 p-6 md:p-8 rounded-[30px] shadow-lg text-left flex flex-col min-h-[500px]">
            <h2 className="text-xl font-semibold text-[#1B1B1B] tracking-tight mb-6 flex items-center gap-2">
              <Database className="h-5 w-5 text-[#C92C15]" />
              <span>Active Portfolio List ({projects.length})</span>
            </h2>

            {projectsLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-8 h-8 border-3 border-[#C92C15]/20 border-t-[#C92C15] rounded-full animate-spin mb-3" />
                <span className="text-xxs uppercase tracking-wider text-[#6F6F6F] font-bold">Retrieving records...</span>
              </div>
            ) : projects.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border border-dashed border-black/10 rounded-2xl bg-[#FAF7F5]/50">
                <Database className="h-8 w-8 text-[#6F6F6F]/40 mb-3" />
                <p className="text-sm font-medium text-[#6F6F6F]">No projects stored in Firestore database.</p>
                <p className="text-xs text-[#6F6F6F]/70 mt-1">Use the prefill button above or form on the left to add items.</p>
              </div>
            ) : (
              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-black/5 text-[#6F6F6F] uppercase tracking-wider font-extrabold text-[10px]">
                      <th className="py-3 px-2 w-8"></th>
                      <th className="py-3 px-2">No.</th>
                      <th className="py-3 px-2">Name</th>
                      <th className="py-3 px-2">Showcase Images</th>
                      <th className="py-3 px-2">Tag</th>
                      <th className="py-3 px-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5 font-semibold text-[#333333]">
                    {projects.map((proj, index) => (
                      <tr 
                        key={proj.number} 
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, index)}
                        className={`transition-colors duration-200 cursor-move ${
                          dragOverIndex === index ? 'bg-[#C92C15]/10 border-t-2 border-[#C92C15]' : 'hover:bg-[#FAF7F5]/50'
                        }`}
                      >
                        <td className="py-3 px-2 text-center">
                          <GripVertical className="h-4 w-4 text-black/30 hover:text-black/60 transition-colors inline-block" />
                        </td>
                        <td className="py-3 px-2 font-bold text-[#C92C15]">{proj.number}</td>
                        <td className="py-3 px-2 text-[#1B1B1B]">
                          <div className="font-bold">{proj.name}</div>
                          <div className="text-[10px] text-[#6F6F6F] font-normal">{proj.category}</div>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-1.5">
                            {/* Showcase Image thumbnails with View & Download */}
                            {proj.images?.col2 && (
                              <div className="relative group/img">
                                <button
                                  type="button"
                                  onClick={() => setPreviewModal({ url: proj.images.col2, title: `${proj.name} - Main Showcase` })}
                                  className="w-7 h-7 rounded-md border border-black/10 overflow-hidden shrink-0 block bg-gray-100 hover:opacity-90"
                                  title="View Main Showcase"
                                >
                                  <img src={proj.images.col2} alt="Col2" className="w-full h-full object-cover" />
                                </button>
                              </div>
                            )}
                            {proj.images?.col1_1 && (
                              <div className="relative group/img">
                                <button
                                  type="button"
                                  onClick={() => setPreviewModal({ url: proj.images.col1_1, title: `${proj.name} - Detail View 1` })}
                                  className="w-7 h-7 rounded-md border border-black/10 overflow-hidden shrink-0 block bg-gray-100 hover:opacity-90"
                                  title="View Detail View 1"
                                >
                                  <img src={proj.images.col1_1} alt="Col1_1" className="w-full h-full object-cover" />
                                </button>
                              </div>
                            )}
                            {proj.images?.col1_2 && (
                              <div className="relative group/img">
                                <button
                                  type="button"
                                  onClick={() => setPreviewModal({ url: proj.images.col1_2, title: `${proj.name} - Detail View 2` })}
                                  className="w-7 h-7 rounded-md border border-black/10 overflow-hidden shrink-0 block bg-gray-100 hover:opacity-90"
                                  title="View Detail View 2"
                                >
                                  <img src={proj.images.col1_2} alt="Col1_2" className="w-full h-full object-cover" />
                                </button>
                              </div>
                            )}
                            {/* Quick Download Main Image button */}
                            {proj.images?.col2 && (
                              <button
                                type="button"
                                onClick={() => downloadImage(proj.images.col2, `${proj.name.toLowerCase().replace(/\s+/g, '-')}-main.jpg`)}
                                className="p-1 rounded hover:bg-[#C92C15]/10 text-gray-500 hover:text-[#C92C15] transition-colors cursor-pointer"
                                title="Download Main Image"
                              >
                                <Download className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <span className={`inline-block px-2 py-0.5 rounded uppercase text-[9px] font-bold ${
                            proj.tag === 'residential' ? 'bg-blue-50 text-blue-600' :
                            proj.tag === 'commercial' ? 'bg-green-50 text-green-600' :
                            'bg-purple-50 text-purple-600'
                          }`}>
                            {proj.tag}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <button
                            onClick={() => startEditProject(proj)}
                            disabled={actionLoading}
                            className="text-blue-600 hover:bg-blue-50 p-1.5 rounded transition-colors cursor-pointer inline-flex items-center mr-1"
                            title="Edit Project"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.number)}
                            disabled={actionLoading}
                            className="text-[#C92C15] hover:bg-[#C92C15]/5 hover:text-[#D43B13] p-1.5 rounded transition-colors cursor-pointer inline-flex items-center"
                            title="Delete Project"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Lightbox Image Preview Modal */}
      {previewModal && (
        <div 
          onClick={() => setPreviewModal(null)} 
          className="fixed inset-0 z-[999999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-4xl w-full bg-white rounded-3xl p-5 border border-black/10 shadow-2xl flex flex-col items-center"
          >
            <div className="flex items-center justify-between w-full pb-3 border-b border-black/10">
              <span className="text-sm font-bold text-[#111111]">{previewModal.title}</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => downloadImage(previewModal.url, `${previewModal.title.toLowerCase().replace(/\s+/g, '-')}.jpg`)}
                  className="bg-[#C92C15] hover:bg-[#D43B13] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Image</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewModal(null)}
                  className="p-2 rounded-full bg-black/5 hover:bg-black/10 text-gray-700 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="mt-4 max-h-[75vh] overflow-auto flex justify-center w-full">
              <img src={previewModal.url} alt={previewModal.title} className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-md" />
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen Drag & Drop Gallery Organizer Modal (Explore Project UI) */}
      {isGalleryOrganizerOpen && (
        <div className="fixed inset-0 z-[999999] bg-[#0A0A0A]/95 text-white backdrop-blur-xl flex flex-col select-none">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md relative z-20">
            <div>
              <span className="text-[#C92C15] text-[10px] md:text-xs font-bold uppercase tracking-wider block mb-0.5">
                {formData.category || 'Portfolio Project'} &bull; {currentGalleryUrls.length} Images
              </span>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>{formData.name || 'Project'} Gallery Organizer</span>
                <span className="text-xs font-normal text-white/50 bg-white/10 px-2.5 py-1 rounded-full hidden sm:flex items-center gap-1">
                  <Move className="h-3 w-3 text-[#C92C15]" /> Drag & drop cards to reorder
                </span>
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsGalleryOrganizerOpen(false)}
                className="bg-[#C92C15] hover:bg-[#D43B13] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-lg transition-colors"
              >
                <X className="h-4 w-4" />
                <span>Done</span>
              </button>
            </div>
          </div>

          {/* Masonry Columns Layout Area */}
          <div 
            data-lenis-prevent
            className="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20"
          >
            {currentGalleryUrls.length > 0 ? (
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {currentGalleryUrls.map((src, i) => {
                  const isVideo = src.toLowerCase().endsWith('.mp4') || src.toLowerCase().endsWith('.webm') || src.toLowerCase().endsWith('.mov');
                  const isTarget = galleryDragOverIndex === i;
                  const isDragging = draggedGalleryIndex === i;

                  return (
                    <div
                      key={src + i}
                      draggable
                      onDragStart={(e) => handleGalleryDragStart(e, i)}
                      onDragOver={(e) => handleGalleryDragOver(e, i)}
                      onDragLeave={handleGalleryDragLeave}
                      onDrop={(e) => handleGalleryDrop(e, i)}
                      className={`break-inside-avoid relative group overflow-hidden rounded-2xl bg-white/5 border transition-all duration-300 shadow-xl cursor-grab active:cursor-grabbing ${
                        isTarget ? 'border-[#C92C15] ring-4 ring-[#C92C15] scale-[1.03] bg-[#C92C15]/20 z-30' : 'border-white/10 hover:border-white/30'
                      } ${isDragging ? 'opacity-30' : 'opacity-100'}`}
                    >
                      {/* Top Header Badge & Drag Indicator */}
                      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white shadow-lg pointer-events-none">
                        <GripVertical className="h-4 w-4 text-white/70" />
                        <span className="text-xs font-extrabold text-[#C92C15]">Position #{i + 1}</span>
                      </div>

                      {/* Top Right Actions */}
                      <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 bg-black/80 backdrop-blur-md p-1.5 rounded-full border border-white/20 shadow-lg">
                        <button
                          type="button"
                          onClick={() => setPreviewModal({ url: src, title: `${formData.name || 'Project'} - Gallery Image #${i + 1}` })}
                          className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
                          title="Preview Full Size"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => downloadImage(src, `${(formData.name || 'project').toLowerCase().replace(/\s+/g, '-')}-gallery-${i + 1}.jpg`)}
                          className="p-1.5 rounded-full hover:bg-white/20 text-[#C92C15] transition-colors cursor-pointer"
                          title="Download Image"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setCurrentGalleryUrls(prev => prev.filter((_, idx) => idx !== i))}
                          className="p-1.5 rounded-full hover:bg-red-600 text-white transition-colors cursor-pointer"
                          title="Delete from Gallery"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Media preview */}
                      {isVideo ? (
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center min-h-[180px]">
                          <video src={src} className="w-full h-full object-cover" muted playsInline />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full p-3">📹</span>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={src}
                          alt={`Gallery item ${i + 1}`}
                          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <p className="text-base text-white/60">No images in this gallery.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
