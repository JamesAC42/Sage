CREATE TABLE public.dashboards
(
    id uuid NOT NULL,
    name character varying(500) COLLATE pg_catalog."default" NOT NULL,
    creator uuid NOT NULL,
    created_on timestamp with time zone NOT NULL,
    endpoints text COLLATE pg_catalog."default",
    CONSTRAINT dashboards_pkey PRIMARY KEY (id)
)

CREATE TABLE public.users
(
    id uuid NOT NULL,
    username character varying(50) COLLATE pg_catalog."default" NOT NULL,
    email character varying(200) COLLATE pg_catalog."default" NOT NULL,
    password character varying(200) COLLATE pg_catalog."default" NOT NULL,
    created_on timestamp with time zone NOT NULL,
    verified boolean NOT NULL
)