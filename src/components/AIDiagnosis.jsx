import React, { useState } from 'react';
import {
    ArrowLeft,
    Upload,
    Camera,
    Image as ImageIcon,
    AlertTriangle,
    CheckCircle,
    RefreshCw,
    Download,
    Share2
} from 'lucide-react';
import { translations } from '../utils/translations';

const AIDiagnosis = ({ onBack, language = 'en' }) => {
    const t = translations[language];
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedPet, setSelectedPet] = useState('Buddy');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showResults, setShowResults] = useState(false);

    // Fallback translations
    const text = {
        title: "AI Analysis Results",
        reupload: "Re-upload image",
        download: "Download Report",
        uploadedImage: "Uploaded Image",
        analysisResults: "Analysis Results",
        date: "Analysis Date: 1/25/2024",
        preview: "Preview",
        fullReport: "Full Report",
        prescription: "Prescription",
        confidence: "92%",
        condition: "Fungal Infection",
        clinicalFindings: "Clinical Findings:",
        nextSteps: "Recommended Next Steps:",
        disclaimer: "Important: This AI analysis is for preliminary assessment only. Always consult with a qualified veterinarian for proper diagnosis and treatment."
    };

    const pets = [
        {
            id: 'Buddy',
            name: "Buddy",
            breed: "Golden Retriever",
            image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
        },
        {
            id: 'Luna',
            name: "Luna",
            breed: "Persian Cat",
            image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
        }
    ];

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        // Simulate analysis delay
        setTimeout(() => {
            setIsAnalyzing(false);
            setShowResults(true);
        }, 2000);
    };

    const styles = {
        container: `min-h-screen bg-[#FFF0F0] ${language === 'ur' ? 'font-noto-nastaliq text-right' : ''}`,
        header: "bg-orange-500 rounded-2xl p-8 text-white mb-8",
        sectionTitle: "text-lg font-bold text-gray-900 mb-4",
        card: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit"
    };

    if (showResults) {
        return (
            <div className={styles.container}>
                {/* Header */}
                <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <button onClick={onBack} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-gray-700 font-bold flex items-center gap-2 transition-colors">
                                <ArrowLeft size={18} />
                                Back to Dashboard
                            </button>
                            <h1 className="text-2xl font-bold text-gray-900">{text.title}</h1>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={() => setShowResults(false)} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-gray-700 font-bold flex items-center gap-2 transition-colors">
                                <RefreshCw size={18} />
                                {text.reupload}
                            </button>
                            <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-gray-700 font-bold flex items-center gap-2 transition-colors">
                                <Download size={18} />
                                {text.download}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column: Uploaded Image */}
                        <div>
                            <h2 className={styles.sectionTitle}>{text.uploadedImage}</h2>
                            <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 mb-6">
                                <img
                                    src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Uploaded analysis"
                                    className="w-full h-auto rounded-2xl object-cover"
                                />
                            </div>

                            <div className="space-y-3">
                                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all">
                                    <RefreshCw size={20} />
                                    Save to History
                                </button>
                                <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all">
                                    <Share2 size={20} />
                                    Share with Vet
                                </button>
                            </div>
                        </div>

                        {/* Right Column: Analysis Results */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{text.analysisResults}</h2>
                            <p className="text-gray-500 mb-6">{text.date}</p>

                            {/* Tabs */}
                            <div className="bg-gray-200 p-1 rounded-lg flex mb-8">
                                <div className="flex-1 py-1.5 text-center font-bold text-gray-900 bg-white rounded-md shadow-sm">Preview</div>
                                <div className="flex-1 py-1.5 text-center font-bold text-gray-600">Full Report</div>
                                <div className="flex-1 py-1.5 text-center font-bold text-gray-600">Prescription</div>
                            </div>

                            <div className={styles.card}>
                                {/* Condition & Confidence */}
                                <div className="mb-8">
                                    <div className="flex justify-between items-end mb-2">
                                        <label className="text-sm font-medium text-gray-600">Confidence Level</label>
                                        <span className="text-orange-500 font-bold">92%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                                        <div className="bg-orange-500 h-4 rounded-full" style={{ width: '92%' }}></div>
                                    </div>

                                    <label className="text-sm font-medium text-gray-600 block mb-1">Detected Condition</label>
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-3xl font-bold text-gray-900">{text.condition}</h3>
                                        <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold uppercase">High</span>
                                    </div>
                                </div>

                                {/* Recommended Treatment */}
                                <div className="mb-8">
                                    <h4 className="font-bold text-gray-800 mb-3">Recommended Treatment</h4>
                                    <div className="bg-cyan-100 p-4 rounded-xl text-gray-800 font-medium flex gap-3">
                                        <div className="bg-white/50 w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                                            <div className="w-4 h-4 text-cyan-700">Rx</div>
                                        </div>
                                        <p>Apply topical antibiotic cream twice daily for 7-10 days. Keep area clean and dry.</p>
                                    </div>
                                </div>

                                {/* Follow-up Recommendations */}
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-3">Follow-up Recommendations</h4>
                                    <div className="space-y-3">
                                        <div className="bg-green-100 p-3 rounded-lg flex items-center gap-3 text-green-900 font-medium">
                                            <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center">
                                                <CheckCircle size={12} className="text-green-600" />
                                            </div>
                                            Apply Treatment
                                        </div>
                                        <div className="bg-orange-100 p-3 rounded-lg flex items-center gap-3 text-orange-900 font-medium">
                                            <div className="w-5 h-5 rounded-full border-2 border-orange-400 flex items-center justify-center text-orange-500 text-xs">!</div>
                                            Monitor Symptoms
                                        </div>
                                        <div className="bg-rose-100 p-3 rounded-lg flex items-center gap-3 text-rose-900 font-medium">
                                            <div className="w-5 h-5 rounded-full border-2 border-rose-400 flex items-center justify-center text-rose-500 text-xs">!</div>
                                            Veterinary Consultation
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Default View: Upload
    return (
        <div className={`min-h-screen bg-gray-50 ${language === 'ur' ? 'font-noto-nastaliq text-right' : ''}`}>
            <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-6">
                    <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700 text-sm font-medium border border-gray-200">
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Upload Pet Image</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-gray-700 font-bold mb-4">Select Pet</h2>
                            <div className="space-y-3">
                                {pets.map((pet) => (
                                    <div key={pet.id} onClick={() => setSelectedPet(pet.id)} className={`flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition-all ${selectedPet === pet.id ? 'border-orange-500 bg-orange-50 ring-1 ring-orange-500' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
                                        <img src={pet.image} alt={pet.name} className="w-12 h-12 rounded-full object-cover" />
                                        <div>
                                            <p className={`font-bold ${selectedPet === pet.id ? 'text-gray-900' : 'text-gray-700'}`}>{pet.name}</p>
                                            <p className="text-xs text-gray-500">{pet.breed}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-orange-600 flex items-center gap-2 mb-6">
                                <AlertTriangle size={20} />
                                Image Guidelines
                            </h2>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /><span className="text-gray-600 text-sm">Use good lighting</span></li>
                                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /><span className="text-gray-600 text-sm">Ensure image is in clear focus</span></li>
                            </ul>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-900 mb-6">Upload Photo</h2>
                            <div className={`rounded-2xl border-2 border-dashed transition-all p-12 text-center ${dragActive ? 'border-orange-500 bg-orange-50' : 'border-gray-200'} ${selectedFile ? 'border-green-500 bg-green-50' : ''}`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
                                {selectedFile ? (
                                    <div>
                                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={40} /></div>
                                        <p className="text-xl font-bold text-gray-900 mb-2">{selectedFile.name}</p>
                                        <button onClick={() => setSelectedFile(null)} className="text-red-500 text-sm font-medium hover:text-red-600">Remove image</button>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-6"><ImageIcon size={40} /></div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Drag and drop your image here</h3>
                                        <p className="text-gray-500 text-sm mb-8">Supported formats: JPG, PNG, HEIC<br />Maximum size: 10MB</p>
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                            <label className="cursor-pointer bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2">
                                                <Upload size={20} /> Browse Files
                                                <input type="file" className="hidden" onChange={handleChange} accept="image/*" />
                                            </label>
                                            <button className="bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"><Camera size={20} /> Take Photo</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleAnalyze}
                                disabled={!selectedFile || isAnalyzing}
                                className="bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-orange-600 transition-all flex items-center gap-2 disabled:opacity-50"
                            >
                                {isAnalyzing ? 'Analyzing...' : <> <Camera size={24} /> Analyze with AI </>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIDiagnosis;
