CREATE TABLE public.dashboards
(
    id uuid NOT NULL,
    name character varying(500) COLLATE pg_catalog."default" NOT NULL,
    creator_id uuid NOT NULL,
    created_on timestamp with time zone NOT NULL,
    endpoints text COLLATE pg_catalog."default",
    creator_username character varying(500) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT dashboards_pkey PRIMARY KEY (id)
)

CREATE TABLE public.users
(
    id uuid NOT NULL,
    username character varying(50) COLLATE pg_catalog."default" NOT NULL,
    email character varying(200) COLLATE pg_catalog."default" NOT NULL,
    password character varying(200) COLLATE pg_catalog."default" NOT NULL,
    created_on timestamp with time zone NOT NULL,
    verified boolean NOT NULL,
    first_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    profile character varying(500) COLLATE pg_catalog."default"
)