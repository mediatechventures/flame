const path = require('path')
const fs = require('fs-extra')
const src = path.join(process.cwd(), 'src')
const dist = path.join(process.cwd(), 'dist')
const Chassis = require('@chassis/core')
const chassis = new Chassis({
  minify: true,
  layout: {
    maxWidth: 1920
  },
  theme: path.join(src, 'css', 'main.theme')
})

chassis.process(path.join(src, './css/main.css'), (err, processed) => {
  if (err) {
    console.log(err)
    process.exit(1)
  }

  fs.ensureDirSync(path.join(dist), 'css')
  fs.writeFileSync(path.join(dist, 'css', 'main.css'), processed.css)
  fs.writeFileSync(path.join(dist, 'index.html'), fs.readFileSync(path.join(src, 'index.html')).toString())
  fs.copySync(path.join(src, 'assets'), path.join(dist, 'assets'))
})
