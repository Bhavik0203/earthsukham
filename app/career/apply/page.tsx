'use client';

import React, { useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faTimes, faPaperPlane, faSpinner, faCheckCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// Hardcoded for frontend since we don't use .env natively here (or update to process.env.NEXT_PUBLIC_API_URL)
const API_URL = 'http://localhost:8000/api';

function ApplicationFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get('jobId') || 'general';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentCompany: '',
    linkedInProfile: '',
    portfolioUrl: '',
    experienceYears: '',
    currentSalary: '',
    expectedSalary: '',
    noticePeriod: '',
    coverLetter: ''
  });

  const [resume, setResume] = useState<File | null>(null);
  const [additionalDocs, setAdditionalDocs] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const resumeInputRef = useRef<HTMLInputElement>(null);
  const additionalDocsInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Resume file size must be less than 5MB');
        return;
      }
      setResume(file);
    }
  };

  const handleAdditionalDocsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      
      // Check total number of files (max 5)
      if (additionalDocs.length + newFiles.length > 5) {
        alert('You can upload a maximum of 5 additional documents');
        return;
      }

      // Check file sizes
      const validFiles = newFiles.filter(file => file.size <= 5 * 1024 * 1024);
      if (validFiles.length < newFiles.length) {
        alert('Some files were ignored because they exceed the 5MB size limit');
      }

      setAdditionalDocs(prev => [...prev, ...validFiles]);
    }
  };

  const removeAdditionalDoc = (index: number) => {
    setAdditionalDocs(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resume) {
      alert('Please upload your resume');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const submitData = new FormData();
      submitData.append('jobId', jobId);
      
      // Append all text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          submitData.append(key, value);
        }
      });

      // Append resume
      submitData.append('resume', resume);

      // Append additional documents
      additionalDocs.forEach((doc) => {
        submitData.append('additionalDocuments', doc);
      });

      const response = await fetch(`${API_URL}/applications/submit`, {
        method: 'POST',
        body: submitData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit application');
      }

      setSubmitStatus('success');
      // Reset form after 3 seconds and redirect
      setTimeout(() => {
        router.push('/career');
      }, 3000);

    } catch (error: any) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for applying. We have received your application and will review it shortly. 
            Our team will contact you if your profile matches our requirements.
          </p>
          <button
            onClick={() => router.push('/career')}
            className="bg-[#224295] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1a3372] transition-colors w-full"
          >
            Return to Careers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => router.back()} 
            className="flex items-center text-gray-600 hover:text-[#224295] transition-colors mb-4"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back to Job Details
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Submit Your Application
          </h1>
          <p className="text-gray-600">
            Applying for: <span className="font-semibold text-[#224295]">{jobId !== 'general' ? jobId : 'General Application'}</span>
          </p>
        </div>

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <FontAwesomeIcon icon={faTimes} className="text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">
                  {errorMessage}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          <div className="p-6 sm:p-10">
            
            {/* Personal Information */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#224295] focus:border-transparent transition-all outline-none"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#224295] focus:border-transparent transition-all outline-none"
                    placeholder="Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#224295] focus:border-transparent transition-all outline-none"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#224295] focus:border-transparent transition-all outline-none"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            </div>

            {/* Professional Profiles */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Professional Profiles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="linkedInProfile" className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
                  <input
                    type="url"
                    id="linkedInProfile"
                    name="linkedInProfile"
                    value={formData.linkedInProfile}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#224295] focus:border-transparent transition-all outline-none"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <label htmlFor="portfolioUrl" className="block text-sm font-medium text-gray-700 mb-1">Portfolio / Website</label>
                  <input
                    type="url"
                    id="portfolioUrl"
                    name="portfolioUrl"
                    value={formData.portfolioUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#224295] focus:border-transparent transition-all outline-none"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>
            </div>

            {/* Experience & Details */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Experience & Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700 mb-1">Total Experience (Years) *</label>
                  <select
                    id="experienceYears"
                    name="experienceYears"
                    required
                    value={formData.experienceYears}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#224295] focus:border-transparent transition-all outline-none bg-white"
                  >
                    <option value="" disabled>Select experience</option>
                    <option value="Fresher">Fresher (0 years)</option>
                    <option value="1-3">1 - 3 years</option>
                    <option value="3-5">3 - 5 years</option>
                    <option value="5-8">5 - 8 years</option>
                    <option value="8-12">8 - 12 years</option>
                    <option value="12+">12+ years</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="currentCompany" className="block text-sm font-medium text-gray-700 mb-1">Current Company</label>
                  <input
                    type="text"
                    id="currentCompany"
                    name="currentCompany"
                    value={formData.currentCompany}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#224295] focus:border-transparent transition-all outline-none"
                    placeholder="Company Name"
                  />
                </div>
                <div>
                  <label htmlFor="currentSalary" className="block text-sm font-medium text-gray-700 mb-1">Current Salary / CTC</label>
                  <input
                    type="text"
                    id="currentSalary"
                    name="currentSalary"
                    value={formData.currentSalary}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#224295] focus:border-transparent transition-all outline-none"
                    placeholder="e.g. $80,000 / 12 LPA"
                  />
                </div>
                <div>
                  <label htmlFor="expectedSalary" className="block text-sm font-medium text-gray-700 mb-1">Expected Salary / CTC</label>
                  <input
                    type="text"
                    id="expectedSalary"
                    name="expectedSalary"
                    value={formData.expectedSalary}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#224295] focus:border-transparent transition-all outline-none"
                    placeholder="e.g. $100,000 / 15 LPA"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="noticePeriod" className="block text-sm font-medium text-gray-700 mb-1">Notice Period *</label>
                  <select
                    id="noticePeriod"
                    name="noticePeriod"
                    required
                    value={formData.noticePeriod}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#224295] focus:border-transparent transition-all outline-none bg-white"
                  >
                    <option value="" disabled>Select notice period</option>
                    <option value="Immediate">Immediate / Serving Notice</option>
                    <option value="15 Days">15 Days</option>
                    <option value="1 Month">1 Month</option>
                    <option value="2 Months">2 Months</option>
                    <option value="3 Months">3 Months</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Resume & Documents */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Resume & Documents
              </h2>
              
              {/* Resume Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Resume / CV * (PDF, DOC, DOCX - Max 5MB)</label>
                <div 
                  className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl transition-colors ${resume ? 'border-[#224295] bg-blue-50' : 'border-gray-300 hover:border-[#224295] hover:bg-gray-50'}`}
                  onClick={() => resumeInputRef.current?.click()}
                >
                  <div className="space-y-2 text-center cursor-pointer">
                    <FontAwesomeIcon icon={faCloudUploadAlt} className={`mx-auto h-12 w-12 ${resume ? 'text-[#224295]' : 'text-gray-400'}`} />
                    <div className="flex text-sm text-gray-600 justify-center">
                      <span className="relative rounded-md font-medium text-[#224295] hover:text-[#1a3372] focus-within:outline-none">
                        {resume ? 'Change file' : 'Upload a file'}
                      </span>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {resume ? resume.name : 'PDF, DOC, DOCX up to 5MB'}
                    </p>
                  </div>
                  <input 
                    id="resume" 
                    name="resume" 
                    type="file" 
                    className="sr-only" 
                    ref={resumeInputRef}
                    onChange={handleResumeChange}
                    accept=".pdf,.doc,.docx"
                  />
                </div>
              </div>

              {/* Cover Letter */}
              <div className="mb-6">
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">Cover Letter / Message to Hiring Manager</label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  rows={5}
                  value={formData.coverLetter}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#224295] focus:border-transparent transition-all outline-none"
                  placeholder="Tell us why you are a great fit for this role..."
                />
              </div>

              {/* Additional Documents */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Documents (Certificates, Recommendations, etc.)</label>
                <div className="flex items-center space-x-4 mb-4">
                  <button
                    type="button"
                    onClick={() => additionalDocsInputRef.current?.click()}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300 text-sm font-medium"
                  >
                    Add Files
                  </button>
                  <span className="text-sm text-gray-500">Max 5 files (5MB each)</span>
                </div>
                <input 
                  id="additionalDocs" 
                  name="additionalDocs" 
                  type="file" 
                  multiple
                  className="sr-only" 
                  ref={additionalDocsInputRef}
                  onChange={handleAdditionalDocsChange}
                />
                
                {/* List of uploaded additional docs */}
                {additionalDocs.length > 0 && (
                  <ul className="space-y-2 mt-4">
                    {additionalDocs.map((doc, index) => (
                      <li key={index} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <span className="text-sm text-gray-700 truncate max-w-xs">{doc.name}</span>
                        <button
                          type="button"
                          onClick={() => removeAdditionalDoc(index)}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Remove file"
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

          </div>

          {/* Form Footer / Submit */}
          <div className="bg-gray-50 px-6 py-6 sm:px-10 flex items-center justify-end border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#224295] mr-4 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={``inline-flex items-center px-8 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-[#224295] to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#224295] transition-all transform hover:-translate-y-0.5 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : '' cursor-pointer`}`}
            >
              {isSubmitting ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                  Submit Application
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ApplicationForm() {
  return (
    <Suspense fallback={<div className="min-h-screen flex justify-center items-center">Loading...</div>}>
      <ApplicationFormContent />
    </Suspense>
  )
}
