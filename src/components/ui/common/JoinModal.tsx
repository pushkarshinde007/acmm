import React, { useState } from 'react'
import { X, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'
import { useExperience } from '@/core/context/ExperienceContext'
import { siteConfig } from '@/core/config/site.config'

export const JoinModal: React.FC = () => {
  const { isJoinModalOpen, closeJoinModal } = useExperience()
  const [selectedInterest, setSelectedInterest] = useState('Web & Mobile Dev')
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branch: 'Computer Engineering',
    year: 'Second Year (SE)',
  })

  if (!isJoinModalOpen) return null

  const interestAreas = [
    { name: 'Web & Mobile Dev', desc: 'React, Next.js, Flutter, Node.js & Cloud' },
    { name: 'AI & Data Science', desc: 'Machine Learning, Deep Learning & Python' },
    { name: 'UI / UX Design', desc: 'Design systems, Figma & Creative direction' },
    { name: 'Competitive Programming', desc: 'Algorithms, Data Structures & Contests' },
    { name: 'Cloud & Cyber Security', desc: 'DevOps, Docker, AWS & Security architecture' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      closeJoinModal()
    }, 2400)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#071B34]/60 backdrop-blur-sm transition-opacity"
        onClick={closeJoinModal}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-[#FAF7EF] border border-[#071B34]/15 rounded-xl shadow-2xl p-6 sm:p-8 overflow-hidden z-10">
        {/* Architectural subtle top ribbon */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#071B34] via-[#1457A6] to-[#69BCE8]" />

        {/* Close Button */}
        <button
          onClick={closeJoinModal}
          className="absolute top-5 right-5 p-2 rounded-lg text-[#536273] hover:text-[#071B34] hover:bg-[#071B34]/5 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-14 h-14 bg-[#1457A6]/10 text-[#1457A6] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-[#071B34]">
              Welcome to ACM NMIET!
            </h3>
            <p className="text-sm text-[#536273] max-w-md mx-auto">
              Your application has been received. Our team will reach out with onboarding details,
              domain tracks, and orientation schedules.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1457A6] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{siteConfig.chapter.eyebrow}</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#071B34] tracking-tight">
                Join the Chapter
              </h2>
              <p className="text-sm text-[#536273] mt-1">
                Be part of a student community where ideas become skills, projects, and experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#071B34] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#071B34]/15 text-[#102033] text-sm focus:outline-none focus:border-[#1457A6] focus:ring-1 focus:ring-[#1457A6] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#071B34] mb-1.5">
                  College Email / ID
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@nmiet.edu.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#071B34]/15 text-[#102033] text-sm focus:outline-none focus:border-[#1457A6] focus:ring-1 focus:ring-[#1457A6] transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#071B34] mb-1.5">
                  Department / Branch
                </label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#071B34]/15 text-[#102033] text-sm focus:outline-none focus:border-[#1457A6] focus:ring-1 focus:ring-[#1457A6] transition-all"
                >
                  <option>Computer Engineering</option>
                  <option>Information Technology</option>
                  <option>AI & Data Science</option>
                  <option>Electronics & Telecommunication</option>
                  <option>Mechanical Engineering</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#071B34] mb-1.5">
                  Academic Year
                </label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#071B34]/15 text-[#102033] text-sm focus:outline-none focus:border-[#1457A6] focus:ring-1 focus:ring-[#1457A6] transition-all"
                >
                  <option>First Year (FE)</option>
                  <option>Second Year (SE)</option>
                  <option>Third Year (TE)</option>
                  <option>Final Year (BE)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#071B34] mb-1.5">
                Area of Interest
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {interestAreas.map((area) => {
                  const isSelected = selectedInterest === area.name
                  return (
                    <button
                      type="button"
                      key={area.name}
                      onClick={() => setSelectedInterest(area.name)}
                      className={`text-left p-2.5 rounded-lg border text-xs transition-all ${
                        isSelected
                          ? 'border-[#1457A6] bg-[#1457A6]/10 text-[#071B34] font-semibold'
                          : 'border-[#071B34]/10 bg-white hover:border-[#1457A6]/40 text-[#536273]'
                      }`}
                    >
                      <div className="font-medium text-[#102033]">{area.name}</div>
                      <div className="text-[11px] text-[#536273] truncate">{area.desc}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 h-12 rounded-md font-semibold text-white bg-[#071B34] hover:bg-[#1457A6] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-sm"
              >
                <span>Submit Membership Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
