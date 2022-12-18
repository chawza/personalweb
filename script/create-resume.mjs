import remarkGfm from 'remark-gfm'
import { remark } from 'remark'
import remarkMdx from 'remark-mdx'
import fs from 'fs';
import remarkpdf from 'remark-pdf/node';


function saveResume() {
  const aboutMdx = fs.readFileSync('pages/about.mdx', 'utf8')
  const processed = remark()
    .use(remarkMdx)
    .use(remarkGfm)
    .use(remarkpdf, { output: 'blob' })
    .processSync(aboutMdx);
  
  fs.writeFileSync(processed.result, resultPath);
}

saveResume()
