-- Table: public.user_data

-- DROP TABLE IF EXISTS public.user_data;

--postgres db

CREATE TABLE IF NOT EXISTS public.user_data
(
    id bigint NOT NULL DEFAULT nextval('user_data_id_seq'::regclass),
    username character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    data json,
    CONSTRAINT user_data_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.user_data
    OWNER to postgres;