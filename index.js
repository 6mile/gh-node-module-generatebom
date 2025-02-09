// This file is part of CycloneDX GitHub Action for Node.js
//
// Licensed under the Apache License, Version 2.0 (the “License”);
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// SPDX-License-Identifier: Apache-2.0
// Copyright (c) Patrick Dwyer. All Rights Reserved.

const fs = require('fs');
const core = require('@actions/core');
const execSync = require('child_process').execSync;

try {
  // check it CycloneDX is installed
  try {
    execSync('cyclonedx-bom --help');
  } catch (error) {
    console.log('Installing CycloneDX...');
    let output = execSync('npm install -g @cyclonedx/bom', { encoding: 'utf-8' });
    console.log(output);
  }

  const path = core.getInput('path');
  const out = core.getInput('output');

  console.log('Options:');
  console.log(`  path: ${path}`);
  console.log(`  output: ${out}`);

  let command = `cyclonedx-bom --output=${out} ${path}`

  console.log(`Running: ${command}`);

  output = execSync(command, { encoding: 'utf-8' });
  console.log(output);

  console.log('BOM Contents:');
  let bomContents = fs.readFileSync(`${out}`).toString('utf8');
  console.log(bomContents);
} catch (error) {
  core.setFailed(error.message);
}