const fs = require('fs');
let svg = fs.readFileSync('tashkent.svg', 'utf8');

// Convert SVG attributes to React camelCase
svg = svg.replace(/stroke-linejoin/g, 'strokeLinejoin');
svg = svg.replace(/stroke-linecap/g, 'strokeLinecap');
svg = svg.replace(/stroke-width/g, 'strokeWidth');
svg = svg.replace(/class=/g, 'className=');

// Wrap in React component
const out = `
export default function TashkentMapSVG({ activeDistrict, onDistrictHover, onDistrictClick }: any) {
  return (
    ${svg.match(/<svg[\s\S]*<\/svg>/)[0].replace(/<style[\s\S]*<\/style>/, '')}
  );
}
`;

fs.writeFileSync('components/Districts/TashkentMapSVG.tsx', out);
console.log('Done!');
