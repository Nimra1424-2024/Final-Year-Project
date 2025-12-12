import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Video, MapPin, Eye, FileText, Share2, Download, AlertCircle } from 'lucide-react';
import { translations } from '../utils/translations';
import jsPDF from 'jspdf';

const MedicalHistory = ({ onBack, language = 'en' }) => {
    const t = translations[language];
    const [activeTab, setActiveTab] = useState('consultation');

    const tabs = [
        { id: 'ai', label: 'AI Diagnosis History' },
        { id: 'consultation', label: 'Consultation History' },
        { id: 'prescription', label: 'Prescription' }
    ];

    const consultations = [
        {
            id: 1,
            type: 'Video Consultation',
            date: '2/1/2024 at 10:00:00 AM',
            petId: 1,
            petName: 'Buddy',
            vetName: 'Dr. Sarah Johnson',
            status: 'completed',
            price: '$75',
            notes: 'Regular checkup. Pet is healthy. Recommended annual vaccination.',
            prescription: 'Multivitamin supplements - 1 tablet daily for 30 days'
        },
        {
            id: 2,
            type: 'In-Person Visit',
            date: '2/5/2024 at 02:30:00 PM',
            petId: 2,
            petName: 'Luna',
            vetName: 'Dr. Michael Chen',
            status: 'pending',
            price: '$125',
            notes: 'Pending consultation',
            prescription: 'N/A'
        }
    ];

    const diagnoses = [
        {
            id: 1,
            condition: 'Dermatitis',
            date: '1/25/2024 at 5:00:00 AM',
            confidence: '87%',
            confidenceLevel: 'Medium',
            treatment: 'Apply topical antibiotic cream twice daily for 7-10 days. Keep area clean and dry.',
            image: "https://images.unsplash.com/photo-1576201836163-4975841e71d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            petName: 'Buddy',
            symptoms: 'Red patches on skin, itching, mild hair loss'
        },
        {
            id: 2,
            condition: 'Fungal Infection',
            date: '1/20/2024 at 5:00:00 AM',
            confidence: '92%',
            confidenceLevel: 'High',
            treatment: 'Antifungal medication prescribed. Follow up in 2 weeks.',
            image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            petName: 'Luna',
            symptoms: 'Fungal growth on paws, discoloration, odor'
        }
    ];

    const prescriptions = [
        {
            id: 1,
            medication: 'Antifungal Cream (Clotrimazole)',
            date: '2/1/2024',
            prescribedBy: 'Dr. Sarah Johnson',
            petName: 'Buddy',
            dosage: 'Apply twice daily',
            duration: '7-10 days',
            instructions: 'Apply thin layer to affected area. Keep area clean and dry. Avoid licking.',
            refills: '2 refills available',
            status: 'active'
        },
        {
            id: 2,
            medication: 'Multivitamin Supplements',
            date: '2/1/2024',
            prescribedBy: 'Dr. Sarah Johnson',
            petName: 'Buddy',
            dosage: '1 tablet daily',
            duration: '30 days',
            instructions: 'Give with food. Ensure adequate water intake.',
            refills: '3 refills available',
            status: 'active'
        },
        {
            id: 3,
            medication: 'Antibiotic (Amoxicillin)',
            date: '1/20/2024',
            prescribedBy: 'Dr. Michael Chen',
            petName: 'Luna',
            dosage: '250mg twice daily',
            duration: '14 days',
            instructions: 'Complete full course even if symptoms improve. Give with food.',
            refills: 'No refills',
            status: 'completed'
        }
    ];

    const handleViewDetails = (item, type) => {
        const detailWindow = window.open('', '_blank');
        const content = type === 'consultation' ? `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Consultation Details - ${item.type}</title>
                <style>
                    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; background: #f9fafb; }
                    .header { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 30px; border-radius: 12px; margin-bottom: 30px; }
                    .content { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
                    .info-row { display: flex; justify-content: space-between; padding: 15px 0; border-bottom: 1px solid #e5e7eb; }
                    .label { font-weight: bold; color: #374151; }
                    .value { color: #6b7280; }
                    button { background: #f97316; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 20px; }
                    button:hover { background: #ea580c; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Consultation Details</h1>
                    <p>Skin Intel PetCare AI</p>
                </div>
                <div class="content">
                    <div class="info-row"><span class="label">Type:</span><span class="value">${item.type}</span></div>
                    <div class="info-row"><span class="label">Date:</span><span class="value">${item.date}</span></div>
                    <div class="info-row"><span class="label">Pet:</span><span class="value">${item.petName}</span></div>
                    <div class="info-row"><span class="label">Veterinarian:</span><span class="value">${item.vetName}</span></div>
                    <div class="info-row"><span class="label">Status:</span><span class="value">${item.status}</span></div>
                    <div class="info-row"><span class="label">Price:</span><span class="value">${item.price}</span></div>
                    <div class="info-row"><span class="label">Notes:</span><span class="value">${item.notes}</span></div>
                    <div class="info-row"><span class="label">Prescription:</span><span class="value">${item.prescription}</span></div>
                    <button onclick="window.close()">Close</button>
                    <button onclick="window.print()">Print</button>
                </div>
            </body>
            </html>
        ` : `
            <!DOCTYPE html>
            <html>
            <head>
                <title>AI Diagnosis - ${item.condition}</title>
                <style>
                    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; background: #f9fafb; }
                    .header { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 30px; border-radius: 12px; margin-bottom: 30px; }
                    .content { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
                    .info-row { display: flex; justify-content: space-between; padding: 15px 0; border-bottom: 1px solid #e5e7eb; }
                    .label { font-weight: bold; color: #374151; }
                    .value { color: #6b7280; }
                    img { width: 100%; max-width: 400px; border-radius: 12px; margin: 20px 0; }
                    .badge { display: inline-block; padding: 6px 12px; border-radius: 6px; font-weight: bold; color: white; background: ${item.confidenceLevel === 'High' ? '#ef4444' : '#f97316'}; }
                    button { background: #f97316; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 20px; margin-right: 10px; }
                    button:hover { background: #ea580c; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>AI Diagnosis Report</h1>
                    <p>Skin Intel PetCare AI</p>
                </div>
                <div class="content">
                    <img src="${item.image}" alt="${item.condition}" />
                    <div class="info-row"><span class="label">Condition:</span><span class="value">${item.condition}</span></div>
                    <div class="info-row"><span class="label">Date:</span><span class="value">${item.date}</span></div>
                    <div class="info-row"><span class="label">Pet:</span><span class="value">${item.petName}</span></div>
                    <div class="info-row"><span class="label">Confidence:</span><span class="badge">${item.confidence} - ${item.confidenceLevel}</span></div>
                    <div class="info-row"><span class="label">Symptoms:</span><span class="value">${item.symptoms}</span></div>
                    <div class="info-row"><span class="label">Treatment:</span><span class="value">${item.treatment}</span></div>
                    <button onclick="window.close()">Close</button>
                    <button onclick="window.print()">Print</button>
                </div>
            </body>
            </html>
        `;
        detailWindow.document.write(content);
        detailWindow.document.close();
    };

    const handleViewPrescription = (prescription) => {
        const prescWindow = window.open('', '_blank');
        const content = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Prescription - ${prescription.medication}</title>
                <style>
                    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; background: #f9fafb; }
                    .header { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 30px; border-radius: 12px; margin-bottom: 30px; position: relative; }
                    .rx-symbol { position: absolute; top: 20px; right: 30px; font-size: 48px; opacity: 0.3; }
                    .content { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
                    .info-row { display: flex; justify-content: space-between; padding: 15px 0; border-bottom: 1px solid #e5e7eb; }
                    .label { font-weight: bold; color: #374151; }
                    .value { color: #6b7280; }
                    .medication-name { font-size: 24px; font-weight: bold; color: #111827; margin-bottom: 10px; }
                    .status-badge { display: inline-block; padding: 6px 12px; border-radius: 6px; font-weight: bold; font-size: 12px; text-transform: uppercase; }
                    .active { background: #10b981; color: white; }
                    .completed { background: #6b7280; color: white; }
                    .instructions-box { background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b; }
                    button { background: #f97316; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 20px; margin-right: 10px; }
                    button:hover { background: #ea580c; }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="rx-symbol">℞</div>
                    <h1>Prescription</h1>
                    <p>Skin Intel PetCare AI</p>
                </div>
                <div class="content">
                    <div class="medication-name">${prescription.medication}</div>
                    <span class="status-badge ${prescription.status}">${prescription.status}</span>
                    <div class="info-row"><span class="label">Date Prescribed:</span><span class="value">${prescription.date}</span></div>
                    <div class="info-row"><span class="label">Prescribed By:</span><span class="value">${prescription.prescribedBy}</span></div>
                    <div class="info-row"><span class="label">Pet:</span><span class="value">${prescription.petName}</span></div>
                    <div class="info-row"><span class="label">Dosage:</span><span class="value">${prescription.dosage}</span></div>
                    <div class="info-row"><span class="label">Duration:</span><span class="value">${prescription.duration}</span></div>
                    <div class="info-row"><span class="label">Refills:</span><span class="value">${prescription.refills}</span></div>
                    <div class="instructions-box">
                        <h3 style="margin-top: 0; color: #92400e;">Instructions:</h3>
                        <p style="margin: 0; color: #78350f; line-height: 1.6;">${prescription.instructions}</p>
                    </div>
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; color: #6b7280; font-size: 14px;">
                        <p><strong>Important:</strong> Follow the prescribed dosage and duration. Consult your veterinarian if you notice any adverse reactions.</p>
                    </div>
                    <button onclick="window.close()">Close</button>
                    <button onclick="window.print()">Print</button>
                </div>
            </body>
            </html>
        `;
        prescWindow.document.write(content);
        prescWindow.document.close();
    };

    const handleDownloadReport = async (diagnosis) => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const margin = 20;
        let yPosition = margin;

        // Header
        pdf.setFillColor(249, 115, 22);
        pdf.rect(0, 0, pageWidth, 50, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(24);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Skin Intel PetCare AI', margin, yPosition + 10);
        pdf.setFontSize(18);
        pdf.text('AI Diagnosis Report', margin, yPosition + 20);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`Generated on ${new Date().toLocaleDateString()}`, margin, yPosition + 28);

        yPosition = 60;

        // Content
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Diagnosis Details', margin, yPosition);
        yPosition += 15;

        // Details
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Condition:', margin, yPosition);
        pdf.setFont('helvetica', 'normal');
        pdf.text(diagnosis.condition, margin + 30, yPosition);
        yPosition += 8;

        pdf.setFont('helvetica', 'bold');
        pdf.text('Pet:', margin, yPosition);
        pdf.setFont('helvetica', 'normal');
        pdf.text(diagnosis.petName, margin + 30, yPosition);
        yPosition += 8;

        pdf.setFont('helvetica', 'bold');
        pdf.text('Date:', margin, yPosition);
        pdf.setFont('helvetica', 'normal');
        pdf.text(diagnosis.date, margin + 30, yPosition);
        yPosition += 8;

        pdf.setFont('helvetica', 'bold');
        pdf.text('Confidence:', margin, yPosition);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`${diagnosis.confidence} - ${diagnosis.confidenceLevel}`, margin + 30, yPosition);
        yPosition += 15;

        // Treatment
        pdf.setFillColor(254, 243, 199);
        pdf.rect(margin - 5, yPosition - 5, pageWidth - 2 * margin + 10, 40, 'F');
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(146, 64, 14);
        pdf.text('Treatment:', margin, yPosition + 5);
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(120, 53, 15);
        const splitTreatment = pdf.splitTextToSize(diagnosis.treatment, pageWidth - 2 * margin - 10);
        pdf.text(splitTreatment, margin, yPosition + 15);

        const fileName = `diagnosis-${diagnosis.condition.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.pdf`;
        pdf.save(fileName);
    };

    const handleShareWithVet = (item, type) => {
        let subject, body;

        if (type === 'consultation') {
            subject = `Consultation Details - ${item.type}`;
            body = `Consultation Details:\n\nType: ${item.type}\nDate: ${item.date}\nPet: ${item.petName}\nVeterinarian: ${item.vetName}\nStatus: ${item.status}\nPrice: ${item.price}\n\nNotes: ${item.notes}\n\nPrescription: ${item.prescription}`;
        } else if (type === 'prescription') {
            subject = `Prescription - ${item.medication}`;
            body = `Prescription Details:\n\nMedication: ${item.medication}\nDate: ${item.date}\nPrescribed By: ${item.prescribedBy}\nPet: ${item.petName}\n\nDosage: ${item.dosage}\nDuration: ${item.duration}\nRefills: ${item.refills}\n\nInstructions: ${item.instructions}\n\nStatus: ${item.status}`;
        } else {
            subject = `AI Diagnosis Report - ${item.condition}`;
            body = `AI Diagnosis Report:\n\nCondition: ${item.condition}\nDate: ${item.date}\nPet: ${item.petName}\nConfidence: ${item.confidence} (${item.confidenceLevel})\n\nSymptoms: ${item.symptoms}\n\nTreatment: ${item.treatment}`;
        }

        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <div className={`min-h-screen bg-gray-50 ${language === 'ur' ? 'font-noto-nastaliq text-right' : ''}`}>
            {/* Header */}
            <div className="bg-white px-8 py-4 flex items-center justify-between shadow-sm border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-colors">
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Medical History</h1>
                </div>

                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search for History"
                            className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg text-sm focus:ring-1 focus:ring-orange-500 w-64"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200">
                        <Filter size={16} />
                        All Time
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="bg-gray-200 p-1 rounded-xl flex mb-8 max-w-4xl mx-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-2 text-center font-bold text-sm rounded-lg transition-all ${activeTab === tab.id
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="max-w-5xl mx-auto space-y-6">
                    {activeTab === 'consultation' && consultations.map(apt => (
                        <div key={apt.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500">
                                        {apt.type.includes('Video') ? <Video size={32} /> : <MapPin size={32} />}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{apt.type}</h3>
                                        <p className="text-gray-500">{apt.date}</p>
                                        <p className="text-gray-500">Pet: {apt.petName} • Vet: {apt.vetName}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    {apt.status === 'completed' ? (
                                        <div className="bg-green-500 text-white px-6 py-2 rounded-lg font-bold uppercase text-sm mb-2 text-center">
                                            Completed
                                        </div>
                                    ) : (
                                        <div className="bg-gray-500 text-white px-6 py-2 rounded-lg font-bold uppercase text-sm mb-2 text-center">
                                            Pending
                                        </div>
                                    )}
                                    <div className="text-2xl font-bold text-gray-900">{apt.price}</div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleViewDetails(apt, 'consultation')}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-gray-700 transition-colors"
                                >
                                    <Eye size={18} />
                                    View Details
                                </button>
                                <button
                                    onClick={() => handleViewDetails(apt, 'consultation')}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-gray-700 transition-colors"
                                >
                                    <FileText size={18} />
                                    View Prescription
                                </button>
                                <button
                                    onClick={() => handleShareWithVet(apt, 'consultation')}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 rounded-lg font-bold text-white transition-colors"
                                >
                                    <Share2 size={18} />
                                    Share with Vet
                                </button>
                            </div>
                        </div>
                    ))}

                    {activeTab === 'ai' && diagnoses.map(diagnosis => (
                        <div key={diagnosis.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex gap-4">
                                    <img src={diagnosis.image} className="w-24 h-24 rounded-xl object-cover" alt="Diagnosis" />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{diagnosis.condition}</h3>
                                        <p className="text-gray-500 mb-2">{diagnosis.date}</p>
                                        <p className="text-gray-600 text-sm">Pet: {diagnosis.petName}</p>
                                        <p className="text-gray-800 mt-2">{diagnosis.treatment}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="bg-gray-200 px-3 py-1 rounded text-sm font-medium">Confidence {diagnosis.confidence}</span>
                                    <span className={`px-4 py-1 rounded text-white font-bold uppercase text-sm ${diagnosis.confidenceLevel === 'High' ? 'bg-red-600' : 'bg-orange-500'
                                        }`}>
                                        {diagnosis.confidenceLevel}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={() => handleViewDetails(diagnosis, 'diagnosis')}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-gray-700 transition-colors"
                                >
                                    <Eye size={18} />
                                    View Details
                                </button>
                                <button
                                    onClick={() => handleDownloadReport(diagnosis)}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-gray-700 transition-colors"
                                >
                                    <Download size={18} />
                                    Download Report
                                </button>
                                <button
                                    onClick={() => handleShareWithVet(diagnosis, 'diagnosis')}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 rounded-lg font-bold text-white transition-colors"
                                >
                                    <Share2 size={18} />
                                    Share with Vet
                                </button>
                            </div>
                        </div>
                    ))}

                    {activeTab === 'prescription' && prescriptions.map(prescription => (
                        <div key={prescription.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-3xl font-bold">
                                        ℞
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{prescription.medication}</h3>
                                        <p className="text-gray-500 mb-2">{prescription.date}</p>
                                        <p className="text-gray-600 text-sm">Pet: {prescription.petName} • Prescribed by: {prescription.prescribedBy}</p>
                                        <div className="mt-2">
                                            <p className="text-gray-700"><span className="font-semibold">Dosage:</span> {prescription.dosage}</p>
                                            <p className="text-gray-700"><span className="font-semibold">Duration:</span> {prescription.duration}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className={`px-4 py-1 rounded-full text-white font-bold uppercase text-xs ${prescription.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                                        }`}>
                                        {prescription.status}
                                    </span>
                                    <span className="text-sm text-gray-500">{prescription.refills}</span>
                                </div>
                            </div>

                            <div className="bg-yellow-50 p-3 rounded-lg mb-4 border border-yellow-100">
                                <p className="text-sm text-gray-700"><span className="font-semibold">Instructions:</span> {prescription.instructions}</p>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleViewPrescription(prescription)}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-gray-700 transition-colors"
                                >
                                    <Eye size={18} />
                                    View Details
                                </button>
                                <button
                                    onClick={() => handleViewPrescription(prescription)}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-gray-700 transition-colors"
                                >
                                    <Download size={18} />
                                    Download
                                </button>
                                <button
                                    onClick={() => handleShareWithVet(prescription, 'prescription')}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 rounded-lg font-bold text-white transition-colors"
                                >
                                    <Share2 size={18} />
                                    Share
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MedicalHistory;
