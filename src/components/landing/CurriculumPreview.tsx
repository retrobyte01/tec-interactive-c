import React from 'react';
import { COURSE_MODULES } from '../../data/courseData';
import { FolderFloat } from '../reactbits/FolderFloat';
import { FadeContent } from '../reactbits/FadeContent';

interface CurriculumPreviewProps {
  onSelectModule: (moduleId: string) => void;
}

export const CurriculumPreview: React.FC<CurriculumPreviewProps> = ({ onSelectModule }) => {
  const folderItems = COURSE_MODULES.map((mod) => ({
    id: mod.id,
    chapterNumber: mod.chapterNumber,
    title: mod.title,
    subtitle: mod.subtitle,
    lessonsCount: mod.lessons.length,
    badge: mod.badge,
    color: mod.color,
    onClick: () => onSelectModule(mod.id)
  }));

  return (
    <section id="curriculum-section" className="py-20 px-4 max-w-6xl mx-auto">
      <FadeContent>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-xs uppercase tracking-widest font-bold text-[#007AFF] mb-2">
              Curriculum Exploration
            </h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-[#171719] dark:text-[#F5F5F7]">
              11 Comprehensive Modules
            </p>
          </div>
          <p className="text-sm text-[#777780] dark:text-[#9898A0] max-w-md mt-3 md:mt-0">
            Directly structured from the complete C programming guide. Select any module to preview its lessons, code examples, and practice challenges.
          </p>
        </div>
      </FadeContent>

      {/* Mandatory Component 3: Folder Float */}
      <FolderFloat items={folderItems} />
    </section>
  );
};
