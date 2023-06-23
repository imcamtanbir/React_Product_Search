import classes from "./MainNavigation.module.css";
function MainNavigation() {
  return (
    <header>
      <div>
        <ul className={classes.breadcrumb}>
          <li>
            <a href="google.com">Home</a>
          </li>
          <li>
            <a href="google.com">Product Listing</a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default MainNavigation;
