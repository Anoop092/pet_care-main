import Link from "next/link";
import React from "react";

const DropdownLink = React.forwardRef(({ href, children, ...rest }, ref) => {
  return (
    <Link href={href} passHref>
      <a {...rest}>{children}</a>
    </Link>
  );
});

export default DropdownLink;
