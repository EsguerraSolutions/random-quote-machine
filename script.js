const API = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

const colorArray = ["#55efc4", "#81ecec", "#74b9ff", "#a29bfe", "#dfe6e9", "#00b894", "#00cec9", "#0984e3", "#6c5ce7", "#b2bec3", "#ffeaa7", "#fab1a0", "#ff7675", "#fd79a8", "#fdcb6e", "#e17055", "#e84393"];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: [
      {
        quote: "",
        author: "" }],


      quoteIndex: 0,
      colorIndex: 0,
      animate: true };

    this.getIndex = this.getIndex.bind(this);
    this.handleAnimate = this.handleAnimate.bind(this);
  }

  componentDidMount() {
    fetch(API).then(res => res.json()).
    then(res => {
      this.setState({
        quote: res.quotes },
      this.getIndex);
    });
  }

  getIndex() {
    const { quote, quoteIndex, colorIndex, animate } = this.state;
    if (quote.length > 0) {
      let quoteIndex = Math.floor(Math.random() * quote.length);
      let colorIndex = Math.floor(Math.random() * colorArray.length);
      this.setState({
        colorIndex,
        quoteIndex,
        animate: true });

    }
  }

  handleAnimate() {
    const { animate } = this.state;
    this.setState({
      animate: false });

  }

  render() {
    const { quote, quoteIndex, colorIndex, animate } = this.state;
    let randomQuote = quote[quoteIndex];
    let randomColor = { backgroundColor: colorArray[colorIndex] };
    let boxAnimateStyle = animate ? "animate__animated animate__rubberBand wrapper col-xs-6 mx-3 p-4 rounded shadow" : "wrapper col-xs-6 mx-3 p-4 rounded shadow";
    let bgAnimateStyle = animate ? "d-flex flex-column justify-content-center vh-100 align-items-center animate__animated animate__fadeIn" : "d-flex flex-column justify-content-center vh-100 align-items-center";
    const twitterURL = `https://twitter.com/intent/tweet?text=${randomQuote.quote}-${randomQuote.author}`;
    return /*#__PURE__*/(
      React.createElement("div", { className: bgAnimateStyle, style: randomColor }, /*#__PURE__*/
      React.createElement("wrapper", { className: boxAnimateStyle, id: "quote-box", onAnimationEnd: this.handleAnimate },
      randomQuote && /*#__PURE__*/React.createElement("p", { id: "text" }, /*#__PURE__*/React.createElement("i", { className: "fas fa-quote-left quoteIcon" }), " ", randomQuote.quote, " ", /*#__PURE__*/React.createElement("i", { className: "fas fa-quote-right quoteIcon" })),
      randomQuote && /*#__PURE__*/React.createElement("cite", { className: "d-flex justify-content-end mb-4", id: "author" }, "- ", randomQuote.author), /*#__PURE__*/
      React.createElement("div", { className: "d-flex justify-content-between" }, /*#__PURE__*/
      React.createElement("a", { href: twitterURL, target: "_blank", className: "btn btn-primary d-flex align-items-center", id: "tweet-quote" }, /*#__PURE__*/React.createElement("i", { className: "fab fa-twitter" }), "\xA0Tweet"), /*#__PURE__*/
      React.createElement("button", { className: "btn btn-primary", onClick: this.getIndex, id: "new-quote" }, /*#__PURE__*/React.createElement("i", { className: "fas fa-random" }), " New Quote"))), /*#__PURE__*/


      React.createElement("p", { className: animate ? "animate__animated animate__heartBeat mt-3" : "mt-3" }, "Coded by Jonathan")));


  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));