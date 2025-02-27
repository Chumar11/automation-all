import { NextSeo } from "next-seo";
import PropTypes from "prop-types";
// theme
import palette from "src/theme/palette";
// ----------------------------------------------------------------------
// eslint-disable-next-line react/display-name
const initialDescription = "";
const initialTitle = "Ichonic";
const Page = ({ ...props }) => {
  const {
    children,
    id,
    title,
    description,
    openGraph,
    canonical = "",
    ...other
  } = props;
  return (
    <>
      <NextSeo
        title={title || initialTitle}
        description={description || initialDescription}
        canonical="https://app.commercehope.com/"
        openGraph={
          openGraph || {
            url: "https://app.commercehope.com/" + canonical || "",
            title: title || initialTitle,
            description: description || initialDescription,
            images: [
              {
                url: "https://app.commercehope.com/images/commercehope-app-desktop.png",
                width: 800,
                height: 600,
                alt: "commercehope client app image, reactjs nextjs ecommerce sctipt",
              },
              {
                url: "https://app.commercehope.com/img/nextjs-ecommerce-dashboard.png",
                width: 900,
                height: 800,
                alt: "commercehope admin app image, reactjs mongodb ecommerce sctipt",
              },
              {
                url: "https://app.commercehope.com/images/commercehope-app-desktop.png",
              },
              {
                url: "https://app.commercehope.com/images/commercehope-app-desktop.png",
              },
            ],
          }
        }
        robotsProps={{
          nosnippet: true,
          notranslate: true,
          noimageindex: true,
          noarchive: true,
          maxSnippet: -1,
          maxImagePreview: "none",
          maxVideoPreview: -1,
        }}
        additionalMetaTags={[
          {
            property: "dc:creator",
            content: "Techgater",
          },
          {
            property: "keywords",
            content:
              "COMMERCEHOPE ecommerce software,reactjs ecommerce script,nextjs ecommerce script,react next ecommerce script,open source script,ecommerce open source script,react mongodb ecommerce script, react js e-commerce script, next js ecommerce script, COMMERCEHOPE E-commerce script ",
          },
          {
            name: "application-name",
            content: "Commercehope",
          },
          {
            name: "viewport",
            content: "initial-scale=1, width=device-width",
          },
          {
            name: "theme-color",
            content: palette.light.primary.main,
          },
          {
            httpEquiv: "x-ua-compatible",
            content: "IE=edge; chrome=1",
          },
        ]}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon/favicon.png",
          },
          {
            rel: "apple-touch-icon",
            href: "/favicon/apple-touch-icon.png",
            sizes: "76x76",
          },
          // {
          //   rel: "manifest",
          //   href: "/manifest.json",
          // },
        ]}
        {...other}
      />
      {children}
    </>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Page;
