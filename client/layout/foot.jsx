import '../assets/styles/footer.styl'
export default {
  data () {
    return {
      author: 'wq'
    }
  },
  render () {
    return (
      <div id="footer">write by {this.author}</div>
    )
  }
}
