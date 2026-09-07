export type LayerId = 'backend' | 'low' | 'frontend' | 'tools'

export const stack: Record<LayerId, string[]> = {
  backend: ['Java', 'Spring', 'Node.js', 'MySQL', 'Oracle', 'MongoDB'],
  low: ['C++', 'Assembly', 'Reverse engineering', 'Rust'],
  frontend: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'React Native'],
  tools: ['Git', 'GitHub', 'Docker', 'AWS', 'Figma'],
}
