# 📊 ETL Data Hub – Full‑Stack Data Pipeline

A beginner-friendly, full‑stack project that demonstrates **E**xtract, **T**ransform, **L**oad (ETL) from three public data sources into a PostgreSQL database, serves the data via a REST API, and displays it in a clean, responsive React dashboard.
---

## 🚀 Features

- **Extract** – Downloads two direct CSV files and one ZIP archive containing a CSV from the web.
- **Transform** – Parses, unpivots, and cleans the data (e.g., wide‑to‑long for population data).
- **Load** – Inserts structured data into a PostgreSQL database with unique constraints.
- **REST API** – Express server exposes endpoints for each dataset (`/api/population`, `/api/co2`, `/api/gapminder`).
- **React Frontend** – Bootstrap‑based dashboard with dataset selector, loading spinner, error handling, and responsive data table.
- **Easy to extend** – Swap datasets by editing a single ETL script and corresponding SQL schema.

---

## 🧱 Architecture
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ Web URLs │─────▶│ ETL Script │─────▶│ PostgreSQL │
│ (CSV / ZIP) │ │ (Node.js) │ │ Database │
└─────────────┘ └─────────────┘ └──────┬──────┘
│
┌─────────▼─────────┐
│ Express API │
│ (REST endpoints) │
└─────────┬─────────┘
│
┌─────────▼─────────┐
│ React SPA │
│ (Bootstrap UI) │



---

## 🛠️ Tech Stack

| Layer       | Technology                              |
|-------------|-----------------------------------------|
| Frontend    | React (Vite), React‑Bootstrap, Axios    |
| Backend     | Node.js, Express, `cors`, `dotenv`      |
| Database    | PostgreSQL, `pg` driver                 |
| ETL         | Node.js, `axios`, `csv-parser`, `adm-zip` |
| Styling     | Bootstrap 5                             |

---

## 📦 Prerequisites

- **Node.js** ≥ 16.x
- **PostgreSQL** ≥ 14.x
- **Git** (optional)

---


-- Example: run inside etl_db
CREATE TABLE population (
    id SERIAL PRIMARY KEY,
    country_name TEXT,
    year INT,
    population BIGINT
);

CREATE TABLE co2_emissions (
    id SERIAL PRIMARY KEY,
    year INT,
    co2_emissions REAL
);

CREATE TABLE gapminder (
    id SERIAL PRIMARY KEY,
    country TEXT,
    year INT,
    population BIGINT,
    continent TEXT,
    life_exp REAL,
    gdp_per_cap REAL
);# 📊 ETL Data Hub – Full‑Stack Data Pipeline

A beginner-friendly, professional full‑stack project that demonstrates **E**xtract, **T**ransform, **L**oad (ETL) from three public data sources into a PostgreSQL database, serves the data via a REST API, and displays it in a clean, responsive React dashboard.
---

## 🚀 Features

- **Extract** – Downloads two direct CSV files and one ZIP archive containing a CSV from the web.
- **Transform** – Parses, unpivots, and cleans the data (e.g., wide‑to‑long for population data).
- **Load** – Inserts structured data into a PostgreSQL database with unique constraints.
- **REST API** – Express server exposes endpoints for each dataset (`/api/population`, `/api/co2`, `/api/gapminder`).
- **React Frontend** – Bootstrap‑based dashboard with dataset selector, loading spinner, error handling, and responsive data table.
- **Easy to extend** – Swap datasets by editing a single ETL script and corresponding SQL schema.

---

## 🧱 Architecture
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ Web URLs │─────▶│ ETL Script │─────▶│ PostgreSQL │
│ (CSV / ZIP) │ │ (Node.js) │ │ Database │
└─────────────┘ └─────────────┘ └──────┬──────┘
│
┌─────────▼─────────┐
│ Express API │
│ (REST endpoints) │
└─────────┬─────────┘
│
┌─────────▼─────────┐
│ React SPA │
│ (Bootstrap UI) │



---

## 🛠️ Tech Stack

| Layer       | Technology                              |
|-------------|-----------------------------------------|
| Frontend    | React (Vite), React‑Bootstrap, Axios    |
| Backend     | Node.js, Express, `cors`, `dotenv`      |
| Database    | PostgreSQL, `pg` driver                 |
| ETL         | Node.js, `axios`, `csv-parser`, `adm-zip` |
| Styling     | Bootstrap 5                             |

---

## 📦 Prerequisites

- **Node.js** ≥ 16.x
- **PostgreSQL** ≥ 14.x
- **Git** (optional)

---


-- Example: run inside etl_db
CREATE TABLE population (
    id SERIAL PRIMARY KEY,
    country_name TEXT,
    year INT,
    population BIGINT
);

CREATE TABLE co2_emissions (
    id SERIAL PRIMARY KEY,
    year INT,
    co2_emissions REAL
);

CREATE TABLE gapminder (
    id SERIAL PRIMARY KEY,
    country TEXT,
    year INT,
    population BIGINT,
    continent TEXT,
    life_exp REAL,
    gdp_per_cap REAL
