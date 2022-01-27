![sourceagent logo](https://uploads-ssl.webflow.com/607f816e92e31deb1cb0b1a7/609121cd71343e768b82f95f_SourceAgentbySAP_fullcolor_horizontal-web.svg)

## About Source Agent

Source Agent leverages data from the SAP Business Network and 3rd party market intelligence data to help customers rapidly classify suppliers, identity high-potential sourcing opportunities, and ultimately address more categories for spend analysis.

## Getting up and Running

1. Ensure you have Docker Desktop running locally
2. Ensure `yarn` installed globally with `npm install -g yarn`
2. Open terminal and go to repo directory, run `docker-compose up`

### Seeding database

1. After first run you will want to seed the database
2. Change the server/.env `DB_HOST` to `localhost`
3. In server folder, run `npx prisma generate && npx yarn db push && yarn seed`
4. After seeding complete change .env `DB_HOST` back to `postgres` for Dockerfile

## Pushing Schema Changes to DB

```
npx prisma generate (if made changes to schema.prisma file)
```

### Reference

- [SAP UI5 Web Components for React](https://sap.github.io/ui5-webcomponents-react/?path=/story/getting-started--page&globals=theme:sap_horizon)
