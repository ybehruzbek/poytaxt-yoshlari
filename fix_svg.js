const fs = require('fs');
let code = fs.readFileSync('components/Districts/TashkentMapSVG.tsx', 'utf8');

// Replace `<g className="boundary" id="NAME">` with `<g className={\`boundary ${activeDistrict === 'NAME' ? 'active' : ''}\`} id="NAME" onMouseEnter={() => onDistrictHover('NAME')} onClick={() => onDistrictClick('NAME')}>`
code = code.replace(/<g className="boundary" id="([^"]+)">/g, 
  "<g className={`boundary ${activeDistrict === '$1' ? 'active' : ''}`} id=\"$1\" onMouseEnter={() => onDistrictHover('$1')} onClick={() => onDistrictClick('$1')} onMouseLeave={() => onDistrictHover(null)}>"
);

fs.writeFileSync('components/Districts/TashkentMapSVG.tsx', code);
console.log('Fixed SVG tags');
