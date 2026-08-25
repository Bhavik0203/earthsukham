"use client";

// BenefitsSection.jsx
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Upload } from "lucide-react";
import Link from 'next/link';
import openrole from "@/public/images/openrole.png";
import AOS from 'aos';
import 'aos/dist/aos.css';
// import { useEffect } from 'react';


// Define TypeScript interfaces outside the component
interface Job {
  id: number;
  jobTitle?: string;
  jobId?: string;
  location?: string;
  jobType?: string;
  experienceLevel?: string;
  salaryRange?: string;
  postedDate?: string;
  applicationDeadline?: string;
  jobDescription?: string;
  requirements?: string;
  benefits?: string;
  additionalDocFiles?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

interface FormattedJob {
  id: number;
  jobTitle: string;
  link: string;
}

const BenefitsSection = () => {
  // For TypeScript in Next.js App
  //  Router
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    message: string;
    resume: File | null;
  }>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: '',
    resume: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });
  const [fileName, setFileName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev: typeof formData) => ({ ...prev, resume: e.target.files![0] }));
      setFileName(e.target.files[0].name);
    }
  };

  interface FormData {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    message: string;
    resume: File | null;
  }

  interface SubmitStatus {
    success: boolean;
    message: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData object to handle file upload
      const submissionData = new FormData();
      submissionData.append('firstName', formData.firstName);
      submissionData.append('lastName', formData.lastName);
      submissionData.append('phone', formData.phone);
      submissionData.append('email', formData.email);
      submissionData.append('message', formData.message);
      if (formData.resume) {
        submissionData.append('resume', formData.resume);
      }

      // Send to API endpoint
      const response = await fetch('https://api.propertydronerealty.com/applications/submit', {
        method: 'POST',
        body: submissionData,
        // Don't set Content-Type header when sending FormData
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      const result: { message: string } = await response.json();
      setSubmitStatus({
        success: true,
        message: 'Your application has been submitted successfully!'
      });

      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: '',
        resume: null
      });
      setFileName('');

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        success: false,
        message: 'There was an error submitting your application. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const [jobs, setJobs] = useState<FormattedJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://api.propertydronerealty.com/careers');

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();

        // Transform API data to match our component's format
        const formattedJobs: FormattedJob[] = data.map((job: Job) => ({
          id: job.id,
          jobTitle: job.jobTitle || 'Job Opening',
          link: `/careers/careerdetail?id=${job.id}`
        }));

        setJobs(formattedJobs);
        setError(null);
      } catch (err) {
        console.error('Error fetching job opportunities:', err);
        setError('Failed to load job opportunities. Please try again later.');

        // Fallback data in case the API fails
        setJobs([
          {
            id: 1,
            jobTitle: 'Senior Full Stack Developer',
            link: '/careers/careerdetail?id=1'
          },
          {
            id: 2,
            jobTitle: 'Marketing Specialist',
            link: '/careers/careerdetail?id=2'
          },
          {
            id: 3,
            jobTitle: 'Product Manager',
            link: '/careers/careerdetail?id=3'
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section id="top" className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bgimage1.png"
            alt="Luxury Property"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          {/* <div className="absolute inset-0 bg-black opacity-40"></div> */}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="text-center max-w-3xl mx-auto text-[#2C2C2C]">
            <p className=" uppercase  tracking-wider  mb-4"

              style={{ fontSize: '18px', fontFamily: 'Lato', letterSpacing: '0.5px' }}>CAREERS</p>

            <h1
              className="text-[#2C2C2C] mb-6 font-[400] text-[56px] leading-[140%] tracking-[1px] font-[Ivy Mode] 
                max-sm:text-[42px]"
              style={{ fontSize: '56px', fontFamily: 'Ivy Mode', letterSpacing: '1px' }}
            >
              Join Our Mission to Elevate <br /> Real Estate Innovation
            </h1>

            <p className=" mb-8 max-w-xl mx-auto">
              We're building a future where technology, vision, and real estate come together. Explore roles that match your passion and be part of a team shaping the industry.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Link
                href="#open-roles"
              >
                <button className="bg-[#B58A3D] rounded-[4px] text-white hover:bg-white hover:text-[#B58A3D] hover:border hover:border-[#B58A3D] px-6 py-3 flex items-center justify-center gap-2 transition-colors">
                  View Open Roles

                </button>
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-10 bg-gray-50 ">
        <div className="container mx-auto px-4 max-w-6xl text-[#2C2C2C]">
          <div className="mb-12">
            <p className="uppercase text-sm font-medium tracking-wider mb-2">BENEFITS</p>
            <h2 className="text-4xl md:text-5xl font-light leading-tight max-w-xl">
              Your job impacts nearly every facet of your life.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Personal Growth',
                desc: 'Support includes a generous professional development budget',
              },
              {
                title: 'Full Benefits',
                desc: 'Top-notch medical, dental, vision, life, disability, and 401k benefits',
              },
              {
                title: 'Our Culture',
                desc: 'There are many great reasons to be "OOO" and we support them',
              },
              {
                title: 'Equity for All',
                desc: 'Everyone should feel ownership over their workâ€”literally',
              },
              {
                title: 'Collaborative Team',
                desc: 'Work with a diverse, talented, and supportive team where every voice is valued',
              },
              {
                title: 'Performance Rewards',
                desc: 'We offer competitive compensation and recognition for exceptional contributions',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="border-t bg-[#EEF1F5] border-gray-200 pt-6 transition transform hover:-translate-y-1 hover:shadow-lg hover:bg-gray-200 p-4 rounded-[4px]"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Open Roles Section */}
      <section id="open-roles" className="bg-[#EEF1F5] py-10">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            {/* Left side with text and job listings */}
            <div className="w-full md:w-1/2 pr-0 md:pr-8">
              <div className="mb-8">
                <p className="uppercase text-sm font-medium tracking-wider mb-2">OPEN ROLES</p>
                <h2 className="text-3xl md:text-4xl font-light leading-tight">
                  Find your next opportunity<br />and grow with us.
                </h2>
              </div>

              <div className="bg-white rounded shadow-sm">
                {isLoading ? (
                  <div className="p-6 text-center">
                    <div className="animate-pulse flex justify-center">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <p className="mt-2">Loading opportunities...</p>
                  </div>
                ) : error ? (
                  <div className="p-6 text-center text-red-500">{error}</div>
                ) : jobs.length === 0 ? (
                  <div className="p-6 text-center">No open positions at the moment. Check back soon!</div>
                ) : (
                  jobs.map((job, index) => (
                    <Link
                      href={`/career/${job.jobTitle}`}
                      className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${index !== jobs.length - 1 ? 'border-b border-gray-200' : ''
                        }`}
                    >
                      <span className="text-[#2C2C2C] font-medium">{job.jobTitle}</span>
                      <div className="bg-[#B58A3D] text-white p-2 rounded-full">
                        <ArrowRight size={16} />
                      </div>
                    </Link>

                  ))
                )}
              </div>
            </div>

            {/* Right side with image */}
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <div className="lg:sticky lg:top-4 lg:col-start-1 lg:row-span-2 relative h-[520px] min-h-[300px]">
                <Image
                  src={openrole}
                  alt="Professional woman with tablet"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

      </section>
      <section className="bg-gray-50 py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-[4px] shadow-sm overflow-hidden max-w-4xl mx-auto">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row">
                {/* Left column */}
                <div className="w-full md:w-1/3 mb-8 md:mb-0 md:pr-8">
                  <p className="uppercase text-sm font-medium tracking-wider mb-2">APPLY NOW</p>
                  <h2 className="text-3xl md:text-4xl font-light leading-tight mb-6">
                    Join our team
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Don't see a position that meets your unique skillset or background?
                  </p>
                  <p className="text-gray-600">
                    Send your resume and cover letter here.
                  </p>
                </div>

                {/* Right column - Form */}
                <div className="w-full md:w-2/3">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* File Upload Button */}
                    <div className="mb-6">
                      <label
                        htmlFor="resume"
                        className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-[4px] cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <Upload className="mr-2 text-gray-600" size={18} />
                        <span>{fileName || 'Upload Your Resume'}</span>
                        <input
                          type="file"
                          id="resume"
                          name="resume"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Name Fields - Side by Side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Name"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Last Name"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone and Email - Side by Side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Phone"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Email"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    {/* Message Field */}
                    <div>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Message"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#B58A3D] rounded-[4px] text-white hover:bg-white hover:text-[#B58A3D] hover:border hover:border-[#B58A3D] px-6 py-3 flex items-center justify-center gap-2 transition-colors">

                        {isSubmitting ? 'Sending...' : 'Send Application'}
                      </button>
                    </div>

                    {/* Status Message */}
                    {submitStatus.message && (
                      <div className={`mt-4 p-3 rounded-md ${submitStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                        {submitStatus.message}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BenefitsSection;