import React, { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Slash } from "lucide-react";
import { usePathname } from "next/navigation";

const BreadCrumb = () => {
  const pathname = usePathname();

  const path = pathname.split("/").filter((segment) => segment);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {path.slice(1, path.length).map((item, index) => {
          const pathToSegment = `/${path.slice(0, 1 + index + 1).join("/")}`;

          return (
            <Fragment key={pathToSegment}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-white hover:text-orange-50"
                  href={`${pathToSegment}`}
                >
                  {item}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index !== path.slice(1, path.length).length - 1 && (
                <BreadcrumbSeparator>
                  <Slash className="text-white" />
                </BreadcrumbSeparator>
              )}
            </Fragment>
          );
        })}

        {/* <BreadcrumbSeparator>
          <Slash className="text-white" />
        </BreadcrumbSeparator> */}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumb;
