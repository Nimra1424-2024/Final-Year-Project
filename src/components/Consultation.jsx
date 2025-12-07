import React, { useState, useEffect, useRef } from 'react';
import {
    ArrowLeft,
    Mic,
    MicOff,
    Video as VideoIcon,
    VideoOff,
    Share2,
    Download,
    PhoneOff,
    Camera,
    Image as ImageIcon,
    ChevronDown,
    Loader2,
    Send,
    Smile,
    Paperclip
} from 'lucide-react';
import { translations } from '../utils/translations';

const Consultation = ({ onBack, language = 'en', setLanguage, pet }) => {
    const t = translations[language];

    // State for call logic
    const [callStatus, setCallStatus] = useState('connecting'); // connecting, connected, ended
    const [durationSeconds, setDurationSeconds] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [activeTab, setActiveTab] = useState('video');
    const timerRef = useRef(null);

    // Chat State
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! Dr. Chen here. How can I help you today?", sender: 'doc', time: '10:00' },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const chatEndRef = useRef(null);

    // Simulation: Connect after 3 seconds
    useEffect(() => {
        const connectTimer = setTimeout(() => {
            setCallStatus('connected');
        }, 3000);

        return () => clearTimeout(connectTimer);
    }, []);

    // Timer logic
    useEffect(() => {
        if (callStatus === 'connected') {
            timerRef.current = setInterval(() => {
                setDurationSeconds(prev => prev + 1);
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }

        return () => clearInterval(timerRef.current);
    }, [callStatus]);

    // Format time mm:ss
    const formatTime = (totalSeconds) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleEndCall = () => {
        setCallStatus('ended');
        setTimeout(() => {
            onBack();
        }, 2000);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        setMessages([...messages, {
            id: messages.length + 1,
            text: newMessage,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setNewMessage('');

        // Simulate reply
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: prev.length + 1,
                text: "I see. Could you please show me the affected area closely?",
                sender: 'doc',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        }, 1500);
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Fallback translations
    const text = {
        title: "Consultation",
        duration: "Call Duration",
        live: "Live",
        connecting: "Connecting...",
        ended: "Call Ended",
        endCall: "End Call",
        tabs: {
            video: "Video Call",
            chat: "Chat",
            diagnosis: "Diagnosis",
            prescription: "Prescription"
        },
        petInfo: "Pet Information",
        symptoms: "Symptoms:",
        history: "Medical History:",
        allergies: "Allergies:",
        medications: "Current Medications:",
        takePhoto: "Take Photo",
        viewImages: "View Images"
    };

    const styles = {
        container: `min-h-screen bg-[#FFF0F0] ${language === 'ur' ? 'font-noto-nastaliq text-right' : ''}`,
        header: "bg-white px-8 py-4 flex justify-between items-center shadow-sm",
        tab: "flex-1 py-3 text-center font-bold text-gray-700 cursor-pointer hover:bg-gray-200 transition-colors first:rounded-l-full last:rounded-r-full",
        activeTab: "bg-white shadow-md rounded-full text-gray-900 border border-gray-100",
        controlBtn: "w-12 h-12 rounded-lg flex items-center justify-center text-white transition-colors shadow-md transition-all active:scale-95"
    };

    if (callStatus === 'ended') {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center flex-col gap-4 text-white animate-in fade-in duration-300">
                <PhoneOff size={64} className="text-red-500 mb-4" />
                <h2 className="text-3xl font-bold">{text.ended}</h2>
                <p className="text-gray-400">{text.duration}: {formatTime(durationSeconds)}</p>
                <p className="text-sm text-gray-500">Returning to dashboard...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Top Navigation Bar */}
            <div className={styles.header}>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-orange-500">Skin Intel</h1>
                        <p className="text-xs text-gray-400">PetCare AI Platform</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold cursor-pointer">
                        English <ChevronDown size={16} />
                    </div>
                    <img
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                        alt="Profile"
                        className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                    />
                </div>
            </div>

            {/* Sub Header */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-8">
                        <button onClick={onBack} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-colors">
                            <ArrowLeft size={16} />
                            Back to Dashboard
                        </button>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{text.title}</h2>
                            <p className="text-gray-500">
                                {callStatus === 'connecting' ? text.connecting : `${text.duration}: ${formatTime(durationSeconds)}`}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {callStatus === 'connected' && (
                            <span className="bg-green-500 text-white px-3 py-1 rounded text-sm font-bold shadow-sm animate-pulse">
                                {text.live}
                            </span>
                        )}
                        <button onClick={handleEndCall} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm transition-colors">
                            <PhoneOff size={16} />
                            {text.endCall}
                        </button>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="bg-gray-200 p-1 rounded-full flex mb-8">
                    <button onClick={() => setActiveTab('video')} className={`${styles.tab} ${activeTab === 'video' ? styles.activeTab : ''}`}>{text.tabs.video}</button>
                    <button onClick={() => setActiveTab('chat')} className={`${styles.tab} ${activeTab === 'chat' ? styles.activeTab : ''}`}>{text.tabs.chat}</button>
                    <button onClick={() => setActiveTab('diagnosis')} className={`${styles.tab} ${activeTab === 'diagnosis' ? styles.activeTab : ''}`}>{text.tabs.diagnosis}</button>
                    <button onClick={() => setActiveTab('prescription')} className={`${styles.tab} ${activeTab === 'prescription' ? styles.activeTab : ''}`}>{text.tabs.prescription}</button>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column: Video Feed or Chat or Diagnosis */}
                    <div className="space-y-6 flex flex-col h-[600px]">

                        {activeTab === 'video' && (
                            <>
                                <div className="flex gap-4 h-[400px]">
                                    {/* Doctor Video */}
                                    <div className="flex-1 relative rounded-2xl overflow-hidden shadow-lg bg-gray-800 flex items-center justify-center">
                                        {callStatus === 'connecting' ? (
                                            <div className="text-white flex flex-col items-center gap-2">
                                                <Loader2 size={32} className="animate-spin text-orange-500" />
                                                <span className="text-sm font-medium">Connecting to Dr. Chen...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Dr. Michael Chen" className="w-full h-full object-cover" />
                                                <div className="absolute bottom-4 left-4 bg-black/20 backdrop-blur-md text-white px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-2">
                                                    Dr. Michael Chen
                                                </div>
                                            </>
                                        )}

                                        {/* Picture-in-Picture: Patient */}
                                        <div className="absolute bottom-4 right-4 w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden border-2 border-white shadow-xl bg-black">
                                            {isVideoOff ? (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
                                                    <VideoOff size={24} />
                                                </div>
                                            ) : (
                                                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" className="w-full h-full object-cover" />
                                            )}
                                            {isMuted && (
                                                <div className="absolute top-1 right-1 bg-red-500 p-1 rounded-full">
                                                    <MicOff size={12} className="text-white" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="bg-white rounded-xl p-4 flex justify-center gap-4 shadow-sm border border-gray-100">
                                    <button
                                        onClick={() => setIsMuted(!isMuted)}
                                        className={`${styles.controlBtn} ${isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-orange-500 hover:bg-orange-600'}`}
                                    >
                                        {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                                    </button>
                                    <button
                                        onClick={() => setIsVideoOff(!isVideoOff)}
                                        className={`${styles.controlBtn} ${isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-orange-500 hover:bg-orange-600'}`}
                                    >
                                        {isVideoOff ? <VideoOff size={20} /> : <VideoIcon size={20} />}
                                    </button>
                                    <button className={`${styles.controlBtn} bg-white border border-gray-200 text-gray-600 hover:bg-gray-50`}>
                                        <Share2 size={20} />
                                    </button>
                                    <button className={`${styles.controlBtn} bg-white border border-gray-200 text-gray-600 hover:bg-gray-50`}>
                                        <Download size={20} />
                                    </button>
                                </div>
                            </>
                        )}

                        {activeTab === 'chat' && (
                            <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
                                {/* Chat Header */}
                                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                                    <h3 className="font-bold text-gray-800">Chat with Dr. Chen</h3>
                                    <div className="flex gap-2">
                                        <button className="p-2 hover:bg-gray-200 rounded-full text-gray-600"><VideoIcon size={18} /></button>
                                        <button className="p-2 hover:bg-gray-200 rounded-full text-gray-600"><PhoneOff size={18} /></button>
                                    </div>
                                </div>

                                {/* Messages Area */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                                    {messages.map((msg) => (
                                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[80%] rounded-2xl p-4 ${msg.sender === 'user' ? 'bg-orange-500 text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'}`}>
                                                <p className="text-sm">{msg.text}</p>
                                                <p className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-orange-200' : 'text-gray-400'}`}>{msg.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={chatEndRef} />
                                </div>

                                {/* Input Area */}
                                <div className="p-4 bg-white border-t border-gray-100">
                                    <form onSubmit={handleSendMessage} className="flex gap-3">
                                        <button type="button" className="p-3 text-gray-400 hover:bg-gray-100 rounded-xl transition-colors">
                                            <Paperclip size={20} />
                                        </button>
                                        <input
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder="Type a message..."
                                            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                                        />
                                        <button type="submit" className="bg-orange-500 text-white p-3 rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20">
                                            <Send size={20} />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {(activeTab === 'diagnosis' || activeTab === 'prescription') && (
                            <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-y-auto p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">AI Analysis Results</h3>
                                <p className="text-gray-500 mb-6">Analysis Date: 1/25/2024</p>

                                <div className="bg-gray-200 p-1 rounded-lg flex mb-8">
                                    <button onClick={() => setActiveTab('diagnosis')} className={`flex-1 py-1.5 text-center font-bold text-sm rounded-md transition-all ${activeTab === 'diagnosis' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}>Preview</button>
                                    <button onClick={() => setActiveTab('report')} className={`flex-1 py-1.5 text-center font-bold text-sm rounded-md transition-all ${activeTab === 'report' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}>Full Report</button>
                                    <button onClick={() => setActiveTab('prescription')} className={`flex-1 py-1.5 text-center font-bold text-sm rounded-md transition-all ${activeTab === 'prescription' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}>Prescription</button>
                                </div>

                                {(activeTab === 'report') ? (
                                    <div className="prose max-w-none">
                                        <p className="text-gray-600 mb-4 text-sm">
                                            Detailed Analysis Report<br />
                                            Our AI system has analyzed the uploaded image and detected signs consistent with <span className="font-bold text-gray-900">Fungal Infection</span> with a confidence level of 92%.
                                        </p>

                                        <h3 className="font-bold text-gray-900 mb-2 text-sm">Clinical Findings:</h3>
                                        <ul className="list-disc pl-5 space-y-1 text-gray-600 mb-4 text-sm">
                                            <li>Visible inflammation and redness in the affected area</li>
                                            <li>Skin texture changes consistent with dermatitis</li>
                                            <li>No signs of secondary bacterial infection detected</li>
                                            <li>Localized to specific region, suggesting environmental trigger</li>
                                        </ul>

                                        <h3 className="font-bold text-gray-900 mb-2 text-sm">Recommended Next Steps:</h3>
                                        <ol className="list-decimal pl-5 space-y-1 text-gray-600 mb-6 text-sm">
                                            <li>Apply prescribed topical treatment as directed</li>
                                            <li>Monitor for improvement over 7-10 days</li>
                                            <li>Schedule follow-up if symptoms persist or worsen</li>
                                            <li>Consider allergy testing if condition recurs</li>
                                        </ol>

                                        <div className="bg-orange-100 border border-orange-200 rounded-xl p-4 text-orange-800 text-sm">
                                            <span className="font-bold">Important:</span> This AI analysis is for preliminary assessment only. Always consult with a qualified veterinarian.
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-8">
                                        {/* Confidence & Condition */}
                                        <div>
                                            <div className="flex justify-between items-end mb-2">
                                                <label className="text-sm font-medium text-gray-600">Confidence Level</label>
                                                <span className="text-orange-500 font-bold">92%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                                                <div className="bg-orange-500 h-4 rounded-full" style={{ width: '92%' }}></div>
                                            </div>

                                            <label className="text-sm font-medium text-gray-600 block mb-1">Detected Condition</label>
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-3xl font-bold text-gray-900">Fungal Infection</h3>
                                                <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold uppercase">High</span>
                                            </div>
                                        </div>

                                        {/* Recommended Treatment */}
                                        <div>
                                            <h4 className="font-bold text-gray-800 mb-3">Recommended Treatment</h4>
                                            <div className="bg-cyan-100 p-4 rounded-xl text-gray-800 font-medium flex gap-3">
                                                <div className="bg-white/50 w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                                                    <span className="text-xs font-bold text-cyan-700">Rx</span>
                                                </div>
                                                <p>Apply topical antibiotic cream twice daily for 7-10 days. Keep area clean and dry.</p>
                                            </div>
                                        </div>

                                        {/* Follow-up */}
                                        <div>
                                            <h4 className="font-bold text-gray-800 mb-3">Follow-up Recommendations</h4>
                                            <div className="space-y-3">
                                                <div className="bg-green-100 p-3 rounded-lg flex items-center gap-3 text-green-900 font-medium">
                                                    <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center">
                                                        <span className="text-green-600 text-xs">✓</span>
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
                                )}
                            </div>
                        )}

                        {(activeTab === 'report') && (
                            <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-y-auto p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">AI Analysis Results</h3>
                                <p className="text-gray-500 mb-6">Analysis Date: 1/25/2024</p>

                                <div className="bg-gray-200 p-1 rounded-lg flex mb-8">
                                    <button onClick={() => setActiveTab('diagnosis')} className={`flex-1 py-1.5 text-center font-bold text-sm rounded-md transition-all ${activeTab === 'diagnosis' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}>Preview</button>
                                    <button onClick={() => setActiveTab('report')} className={`flex-1 py-1.5 text-center font-bold text-sm rounded-md transition-all ${activeTab === 'report' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}>Full Report</button>
                                    <button onClick={() => setActiveTab('prescription')} className={`flex-1 py-1.5 text-center font-bold text-sm rounded-md transition-all ${activeTab === 'prescription' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}>Prescription</button>
                                </div>

                                <div className="prose max-w-none">
                                    <p className="text-gray-600 mb-4 text-sm">
                                        Detailed Analysis Report<br />
                                        Our AI system has analyzed the uploaded image and detected signs consistent with <span className="font-bold text-gray-900">Fungal Infection</span> with a confidence level of 92%.
                                    </p>

                                    <h3 className="font-bold text-gray-900 mb-2 text-sm">Clinical Findings:</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-600 mb-4 text-sm">
                                        <li>Visible inflammation and redness in the affected area</li>
                                        <li>Skin texture changes consistent with dermatitis</li>
                                        <li>No signs of secondary bacterial infection detected</li>
                                        <li>Localized to specific region, suggesting environmental trigger</li>
                                    </ul>

                                    <h3 className="font-bold text-gray-900 mb-2 text-sm">Recommended Next Steps:</h3>
                                    <ol className="list-decimal pl-5 space-y-1 text-gray-600 mb-6 text-sm">
                                        <li>Apply prescribed topical treatment as directed</li>
                                        <li>Monitor for improvement over 7-10 days</li>
                                        <li>Schedule follow-up if symptoms persist or worsen</li>
                                        <li>Consider allergy testing if condition recurs</li>
                                    </ol>

                                    <div className="bg-orange-100 border border-orange-200 rounded-xl p-4 text-orange-800 text-sm">
                                        <span className="font-bold">Important:</span> This AI analysis is for preliminary assessment only. Always consult with a qualified veterinarian.
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Right Column: Info Panel */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-fit">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">{text.petInfo}</h3>

                        {/* Pet & Owner Avatar Group */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-3">
                                <img src={pet?.image || "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"} alt={pet?.name || "Pet"} className="w-full h-full object-cover" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900">{pet?.name || "Unknown"}</h4>
                            <p className="text-gray-500">{pet?.breed || "Unknown Breed"}</p>
                        </div>

                        {/* Stats Row */}
                        <div className="flex justify-between mb-8 text-gray-800 font-medium">
                            <div className="space-y-1">
                                <p className="text-gray-500">Age:</p>
                                <p className="text-xl font-bold">{pet?.age || "N/A"}</p>
                            </div>
                            <div className="space-y-1 text-right">
                                <p className="text-gray-500">Weight:</p>
                                <p className="text-xl font-bold">{pet?.weight || "N/A"}</p>
                            </div>
                        </div>

                        {/* Owner Mini Profile */}
                        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" className="w-12 h-12 rounded-full" alt="John" />
                            <div>
                                <h5 className="font-bold text-gray-900">John Smith</h5>
                                <p className="text-sm text-gray-500">john.smith@email.com</p>
                            </div>
                        </div>

                        {/* Medical Details */}
                        <div className="space-y-6">
                            <div>
                                <h5 className="font-bold text-gray-900 mb-2">{text.symptoms}</h5>
                                <div className="bg-orange-50 p-4 rounded-xl text-gray-700 text-sm leading-relaxed">
                                    Red, irritated skin patches on paws and belly. Excessive scratching and licking.
                                </div>
                            </div>

                            <div>
                                <h5 className="font-bold text-gray-900 mb-2">{text.history}</h5>
                                <p className="text-gray-600 text-sm">Previous skin allergies, treated with antihistamines last year.</p>
                            </div>

                            <div>
                                <h5 className="font-bold text-gray-900 mb-2">{text.allergies}</h5>
                                <p className="text-gray-600 text-sm">Grass pollen, certain food proteins</p>
                            </div>

                            <div>
                                <h5 className="font-bold text-gray-900 mb-2">{text.medications}</h5>
                                <div className="bg-gray-50 px-4 py-2 rounded-lg inline-block text-gray-700 text-sm">None</div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-8 space-y-3">
                            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-orange-500/20">
                                <Camera size={20} />
                                {text.takePhoto}
                            </button>
                            <button className="w-full bg-white border-2 border-gray-200 text-gray-800 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                                <ImageIcon size={20} />
                                {text.viewImages}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Consultation;
