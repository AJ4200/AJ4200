import { motion } from "framer-motion";

interface Skill {
  name: string;
  proficiency: number;
}

interface Skillset {
  title: string;
  skills: Skill[];
}

interface SkillsetSectionProps {
  skillsets: Skillset[];
}

const SkillsetSection: React.FC<SkillsetSectionProps> = ({ skillsets }) => {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {skillsets.map((skillset, groupIndex) => (
        <motion.article
          className="group relative overflow-hidden border border-white/12 bg-black/35 p-5 backdrop-blur-md sm:p-6"
          initial={{ opacity: 0, y: 30 }}
          key={skillset.title}
          transition={{ delay: groupIndex * 0.08, duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="absolute right-5 top-5 text-xs font-bold text-white/15">
            0{groupIndex + 1}
          </span>
          <h3 className="max-w-[80%] text-2xl font-black uppercase leading-tight text-white">
            {skillset.title}
          </h3>
          <div className="mt-8 space-y-5">
            {skillset.skills.map((skill) => (
              <div key={skill.name}>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-white/65">
                    {skill.name}
                  </span>
                  <span className="text-[0.58rem] tracking-[0.15em] text-red-300">
                    {skill.proficiency}%
                  </span>
                </div>
                <div className="h-1 overflow-hidden bg-white/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-600 to-red-300 shadow-[0_0_12px_rgba(248,113,113,0.65)]"
                    initial={{ width: 0 }}
                    transition={{
                      delay: groupIndex * 0.08 + 0.15,
                      duration: 0.8,
                    }}
                    viewport={{ once: true }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.article>
      ))}
    </div>
  );
};

export default SkillsetSection;
