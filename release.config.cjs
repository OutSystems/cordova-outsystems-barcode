const fs = require('fs');
const xml2js = require('xml2js');

module.exports = {
  branches: ['main'],
  tagFormat: '${version}',  // semantic-release uses vX.Y.Z by default, but our cordova plugins expect X.Y.Z
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        "preset": "angular",
        "releaseRules": [
          { "type": "refactor", "release": "patch" },
          { "type": "chore", "release": "patch" }
        ]
      }
    ],
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    // updates to package version without npm publishing
    [
      '@semantic-release/npm',
      {
        pkgRoot: '.',
        npmPublish: false
      }
    ],
    // update plugin.xml version
    {
      async prepare(pluginConfig, context) {
        const { nextRelease } = context;
        const version = nextRelease.version;

        const xmlPath = 'plugin.xml';
        const xml = fs.readFileSync(xmlPath, 'utf8');

        // Detect current indentation from first indented line
        const match = xml.match(/^( +)\S/m);
        const indent = match ? match[1].length : 2; // fallback to 2 spaces if not found
        const parser = new xml2js.Parser();
        const builder = new xml2js.Builder({ renderOpts: { pretty: true, indent: ' '.repeat(indent) } });

        const parsed = await parser.parseStringPromise(xml);
        parsed.plugin.$.version = version;

        const updatedXml = builder.buildObject(parsed);
        fs.writeFileSync(xmlPath, updatedXml);

        console.log(`🔖 Updated plugin.xml version to ${version}`);
      }
    },
    [
      '@semantic-release/git',
      {
        assets: [
          'package.json',
          'plugin.xml',
          'CHANGELOG.md',
        ],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    [
      '@semantic-release/github',
      {
        successComment: false,
        failComment: false,
        releasedLabels: false,
        addReleases: 'bottom'
      }
    ],
  ]
};