import logo from "@app/data/pictures/courses/gitlab-ci.svg";

const site = {
  name: "gitlab-ci.cz",
  lang: "cs",
  location: "cz",
  gauges_site_id: "5c2f2cec8d21955f797331fa",
  google_analytics_site_id: "UA-39461955-20",
  trainingcrm_url:
    process.env.NODE_ENV == "development"
      ? "https://trainingcrm-demo.sika.io"
      : process.env.TRAININGCRM_URL || "https://trainingcrm.sika.io",

  x_course: "gitlab-ci",
  x_site_claim: "Skoleni Gilab CI",
  x_logo: logo,
  x_contact_link: "https://ondrej-sika.cz/kontakt/?x_source=gitlab-ci.cz",
  x_inquiry_url:
    "https://ondrej-sika.cz/skoleni/gitlab-ci/?x_source=gitlab-ci.cz#form"
};

export default site;
