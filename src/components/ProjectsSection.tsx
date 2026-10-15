import React from 'react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';
import { Project } from '../types';

const projectsData: Project[] = [
  {
    id: 1,
    // slug: 'Cada detalhe merece despertar desejo',
    // name: 'evr',
    description: 'Cada detalhe merece despertar desejo',
    gifUrl: '/imagens/bolo1.jpg',
  },
  {
    id: 2,
    // slug: 'automation-machines',
    // name: 'Automation Machines',
    description: 'Seus bolos são únicos. Sua apresentação também deve ser',
    gifUrl: '/imagens/bolo2.jpg',
  },
  {
    id: 3,
    // slug: 'xportfolio',
    // name: 'xPortfolio',
    description: 'Seus próximos clientes podem se apaixonar pelo seu trabalho antes do primeiro contato.',
    gifUrl: '/imagens/bolo3.jpg',
  },
];

const ProjectItem: React.FC<{ project: Project }> = ({ project }) => {
  const { ref, isInView } = useInViewAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-6 transition-all duration-1000 ${
        isInView ? 'animate-fade-in-up' : 'opacity-0'
      }`}
    >
      {/* Off-set left text block */}
      <div className="pl-14 md:pl-28 text-left">
        <h3 className="font-mondwest text-2xl md:text-3xl font-semibold text-[#051A24] mb-1">
          {project.name}
        </h3>
        <p className="text-sm md:text-base text-[#051A24]/70">
          {project.description}
        </p>
      </div>

      {/* Full width image banner */}
      <div className="w-full h-[240px] md:h-[480px] lg:h-[540px] rounded-2xl overflow-hidden shadow-lg border border-neutral-100 relative group cursor-pointer">
        <img
          src={project.gifUrl}
          alt={project.name ?? project.description}
          className="w-full h-full object-cover rounded-2xl group-hover:scale-[1.02] transition duration-700 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[#051A24]/5 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="work" className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
      {/* Staged list stack */}
      <div className="flex flex-col gap-16 md:gap-24">
        {projectsData.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
