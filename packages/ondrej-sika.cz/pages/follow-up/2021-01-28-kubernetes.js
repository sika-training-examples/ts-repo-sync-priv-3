import React from "react";
import Article from "@app/ondrejsika-theme/layouts/Article";

const Page = () => (
  <Article
    title="Follow Up: Kubernetes, 28. 01. 2021"
    header="Follow Up: Kubernetes"
    subheader="28. 01. 2021"
    hideNewsletter={true}
    markdown={`
## Materiály

### Repozitář s kurzy

- Kubernetes - https://github.com/ondrejsika/kubernetes-training/

### Repozitáře, které jsme při školení vytvořili

- https://github.com/sika-training-examples

### Další použité repozitáře

- Terraform Infrastruktura Demo Gitlabu - https://github.com/ondrejsika/terraform-demo-gitlab
- Traefik Ingress for Kubernets - https://github.com/ondrejsika/kubernetes-ingress-traefik
- Demo Kubernetes Cluster on DigitalOcean - https://github.com/ondrejsika/terraform-do-kubernetes-example
- Prometheus on Kubernetes - https://github.com/ondrejsika/ondrejsika-k8s-prom

### Témata, které jsme nakousli

- Terraform - Infrastructure as a code, [Školení Terraformu](/skoleni/terraform)
- DigitalOcean - Cloudova Platforma, [Školení DigitalOcean](/skoleni/digitalocean)

Pokud byste měli zájem o nějaké další školení, můžete si vybrat zde:

- Všechny kurzy - [https://ondrej-sika.cz/seznam-skoleni/](/seznam-skoleni/)
- Veřejné termíny - [https://ondrej-sika.cz/verejne-terminy/](/verejne-terminy/)

### Ostatní zajímavé repozitáře

- [https://ondrej-sika.cz/repozitare/](/repozitare) - Seznam zajímavých repozitářů
- https://github.com/ondrejsika - Všechny mé repozitáře na Githubu

Pokud se Vám bude něco líbit, budu rád za hvězdičky. Díky.

## DevOps Live

Začal jsem streamovat live coding na témata z DevOps, pokud by Vás to zajímalo více, koukněte na stránku [DevOps Live](/devopslive).

## Další kroky

- Budu rád, když mi napíšete doporučení na LinkedIn a na Twitter
  - Linkedin: přidejte si mne a já vám pošlu žádost - https://www.linkedin.com/in/ondrejsika/
  - Twitter: Tweetnete něco s \`@ondrejsika\`.
- Přidejte se do komunit účastníků mých školení, které buduji na Slacku, Facebooku a Linkedinu - https://join.sika.io
- Pokud jste ve zpětné vazbě nezaškrtly, že chcete newsletter, můžete se přihlásit zde - https://sika.link/newsletter/

Ať se Vám daří ve všem, nejen s Kubernetes!
<br>O.
`}
  />
);

export default Page;
