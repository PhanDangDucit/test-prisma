ALTER TABLE public."user_followers" ADD CONSTRAINT "publisher_uf_up_fkey" FOREIGN KEY ("publisher_id")
    REFERENCES public."user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE public."user_followers" ADD CONSTRAINT "publisher_uf_up_fkey" FOREIGN KEY ("subscriber_id")
    REFERENCES public."user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE public."notifications" ADD CONSTRAINT "publisher_noti_up_fkey" FOREIGN KEY ("publisher_id")
    REFERENCES public."user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE public."notifications" ADD CONSTRAINT "subscriber_noti_up_fkey" FOREIGN KEY ("subscriber_id")
    REFERENCES public."user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
