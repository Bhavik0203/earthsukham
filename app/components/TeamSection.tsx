import Image from "next/image";

const teamMembers = [
  {
    name: "Nabin Prasad",
    role: "CTO",
    bgRoleText: "CTO",
    image: "/images/team1.png", // Replace with your cutout portrait path
  },
  {
    name: "Namrata Kamthe",
    role: "Head Hr",
    bgRoleText: "Head Hr",
    image: "/images/team2.png",
  },
  {
    name: "Sunil Kumar Prasad",
    role: "CEO",
    bgRoleText: "CEO",
    image: "/images/team3.png",
  },
  {
    name: "Poornima Poojari",
    role: "Head TA",
    bgRoleText: "Head TA",
    image: "/images/team4.png",
  },
];

export default function TeamSection() {
  return (
    <section className="bg-[#FAF6F0] text-zinc-900 py-24 px-6 sm:px-12 lg:px-20 min-h-screen flex items-center select-none">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col">
          <span className="text-[#C5A880] text-sm font-medium tracking-wide mb-3 font-serif">
            Meet Our Team
          </span>
          <h2 className="text-4xl md:text-5xl font-normal text-zinc-950 font-serif tracking-tight">
            The People Behind Every Project
          </h2>
        </div>

        {/* Responsive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="relative aspect-[4/5] w-full rounded-b-[2rem] rounded-tl-[3.5rem] rounded-tr-lg overflow-hidden bg-gradient-to-b from-zinc-100 to-zinc-200/50 shadow-sm border border-zinc-200/20 group"
            >
              {/* Gold Background Accent Plate with Asymmetric Curve */}
              <div className="absolute inset-y-0 left-0 w-[42%] bg-[#D5A73B] rounded-tl-[3rem] z-0 overflow-hidden">
                {/* Large vertical rotated background label */}
                <span className="absolute bottom-10 left-1/2 -translate-x-1/2 origin-bottom-left -rotate-90 text-[56px] font-black text-white/20 whitespace-nowrap tracking-tight font-sans select-none block translate-y-4">
                  {member.bgRoleText}
                </span>
              </div>

              {/* Headshot Portrait Asset Layer */}
              <div className="absolute inset-0 z-10 w-full h-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-bottom scale-[1.02] group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>

              {/* Bottom Depth Vignette Gradient Shadow Shield */}
              <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#534015]/90 via-[#7C6124]/50 to-transparent z-20" />

              {/* Labels Content Layer */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center text-center z-30">
                <h3 className="text-white text-xl font-semibold tracking-tight font-sans mb-1">
                  {member.name}
                </h3>
                <p className="text-amber-200/90 text-xs font-medium uppercase tracking-wider font-sans">
                  {member.role}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}