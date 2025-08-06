import { Helmet } from "react-helmet-async";

function Meta({ title, description }) {
  return (
    <Helmet>
      <title>{title}</title>
      {description && (
        <meta name="description" content={description} />
      )}
    </Helmet>
  );
}

export default Meta;
