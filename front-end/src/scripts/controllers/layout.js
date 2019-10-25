import layoutView from '../view/layout.art'

class Layout {
  constructor() {
    this.render()
  }

  render() {
    let html = layoutView()
    $('#wrapper').html(html)
  }
}

export default new Layout()