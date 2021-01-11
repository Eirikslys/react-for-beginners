import React from 'react';

// Stateless functional component
// Can also be written function Header (props) {
// uses implicit return
const Header = (props) => (
  <header className="top">
    <h1>
      Catch
      <span className="ofThe">
        <span className="of"> Of</span>
        <span className="the"> The </span>
      </span>
      day
    </h1>
    <h3 className="tagline">
      <span>{props.tagline}</span>
    </h3>
  </header>
)

// old way of doing it:
// class Header extends React.Component {
//   render() {
//     return (
//       <header className="top">
//         <h1>
//           Catch
//           <span className="ofThe">
//             <span className="of"> Of</span>
//             <span className="the"> The </span>
//           </span>
//           day
//         </h1>
//         <h3 className="tagline">
//           <span>{this.props.tagline}</span>
//         </h3>
//       </header>
//     )
//   }
// }


export default Header
