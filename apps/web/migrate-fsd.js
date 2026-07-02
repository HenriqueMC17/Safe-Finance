const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = "c:/Dev/Safe-Finance/apps/dashboard";
const componentsDir = path.join(rootDir, "components");
const featuresDir = path.join(rootDir, "features");

const fileMap = {
  "accounts-overview.tsx": "accounts",
  "add-money-modal.tsx": "transactions",
  "budget-tracker.tsx": "budget",
  "business-metrics.tsx": "analytics",
  "financial-chart.tsx": "analytics",
  "financial-insights.tsx": "analytics",
  "invoices-dashboard.tsx": "transactions",
  "payment-modal.tsx": "transactions",
  "profile-modal.tsx": "auth",
  "quick-actions.tsx": "transactions",
  "quick-bill-pay.tsx": "transactions",
  "real-accounts-overview.tsx": "accounts",
  "real-transactions.tsx": "transactions",
  "recent-transactions.tsx": "transactions",
  "request-money-modal.tsx": "transactions",
  "savings-goals-dashboard.tsx": "accounts",
  "savings-goals.tsx": "accounts",
  "send-money-modal.tsx": "transactions",
};

const movedFiles = [];

// move files
for (const [file, feature] of Object.entries(fileMap)) {
  const src = path.join(componentsDir, file);
  const targetDir = path.join(featuresDir, feature, "components");
  const target = path.join(targetDir, file);
  
  if (fs.existsSync(src)) {
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.renameSync(src, target);
    movedFiles.push({ file, from: src, to: target, feature });
    console.log(`Moved ${file} to features/${feature}/components`);
  }
}

// walk all ts, tsx files to update imports
function walkSync(dir, filelist = []) {
  if (!fs.existsSync(dir)) return filelist;
  fs.readdirSync(dir).forEach(file => {
    const fn = path.join(dir, file);
    if(fn.includes('node_modules') || fn.includes('.next')) return;
    filelist = fs.statSync(fn).isDirectory() ? walkSync(fn, filelist) : filelist.concat(fn);
  });
  return filelist;
}

const allFiles = walkSync(rootDir).filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));

for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf-8');
  let changed = false;
  
  for (const moved of movedFiles) {
    const oldImport = `@/components/${moved.file.replace('.tsx', '')}`;
    const newImport = `@/features/${moved.feature}/components/${moved.file.replace('.tsx', '')}`;
    
    if (content.includes(oldImport)) {
      content = content.split(oldImport).join(newImport);
      changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Updated imports in ${file}`);
  }
}

console.log('Migration complete');
