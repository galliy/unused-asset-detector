const fs = require('fs');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');
const inquirer = require('inquirer');

const assetExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.woff', '.woff2', '.ttf', '.css', '.scss'];
const sourceExtensions = ['.js', '.ts', '.jsx', '.tsx', '.html', '.css', '.scss'];

const assetFolder = 'C:/Users/galvi/test-frontend/src/assets';
const projectFolder = 'C:/Users/galvi/test-frontend/src';

let totalAssets = [];
let usedAssets = new Set();

function getAllAssets() {
  console.log(chalk.cyan('🔍 Scanning for asset files...'));

  assetExtensions.forEach(ext => {
    const pattern = path.posix.join(assetFolder.replace(/\\/g, '/'), `**/*${ext}`);
    const files = glob.sync(pattern, { nodir: true });
    console.log(chalk.gray(`  - Found ${files.length} ${ext} files`));
    totalAssets.push(...files.map(f => path.normalize(f)));
  });

  console.log(chalk.green(`✅ Found ${totalAssets.length} asset files.`));
}

function findUsedAssets() {
  console.log(chalk.cyan('🔎 Scanning for asset references in source files...'));

  const allSourceFiles = [];

  sourceExtensions.forEach(ext => {
    const pattern = path.posix.join(projectFolder.replace(/\\/g, '/'), `**/*${ext}`);
    const files = glob.sync(pattern, { nodir: true });
    allSourceFiles.push(...files.map(f => path.normalize(f)));
  });

  allSourceFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf-8');

    totalAssets.forEach(asset => {
      const assetName = path.basename(asset);
      if (content.includes(assetName)) {
        usedAssets.add(asset);
      }
    });
  });

  console.log(chalk.green(`✅ Found ${usedAssets.size} used asset references.`));
}

function showReport() {
  const unusedAssets = totalAssets.filter(asset => !usedAssets.has(asset));

  console.log(chalk.yellow('\n📄 Unused Assets Report:'));
  unusedAssets.forEach(file => {
    console.log(chalk.gray('•'), file);
  });

  console.log(chalk.blue('\n📊 Summary:'));
  console.log(`Total Assets: ${chalk.white(totalAssets.length)}`);
  console.log(`Used Assets: ${chalk.green(usedAssets.size)}`);
  console.log(`Unused Assets: ${chalk.red(unusedAssets.length)}`);

  promptDeleteUnusedAssets(unusedAssets);
}

function promptDeleteUnusedAssets(unusedAssets) {
  if (unusedAssets.length === 0) return;

  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'confirmDelete',
        message: `🗑️  Do you want to delete ${unusedAssets.length} unused asset(s)?`,
        default: false,
      },
    ])
    .then((answers) => {
      if (answers.confirmDelete) {
        unusedAssets.forEach(file => {
          fs.unlinkSync(file);
          console.log(chalk.red(`Deleted: ${file}`));
        });
        console.log(chalk.red.bold('\n🧹 Unused assets deleted.\n'));
      } else {
        console.log(chalk.yellow('\nNo files were deleted.\n'));
      }
    });
}

function run() {
  console.log(chalk.blue.bold('\n🚀 Unused Asset Detector Started...\n'));
  getAllAssets();
  findUsedAssets();
  showReport();
}

run();
