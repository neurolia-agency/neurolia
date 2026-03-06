-- Post-run verification queries for workflow tests.
-- Adapt if your schema differs.

-- WF04: cleaning tasks created for the test reservation
select id, reservation_id, property_id, type, status, assigned_to, scheduled_date
from cleaning_tasks
where reservation_id = '00000000-0000-0000-0000-000000000001'
order by created_at desc;

-- Reservation check (WF01 / WF02 side effects)
select id, property_id, platform, status, check_in, check_out, updated_at
from reservations
where property_id = '06f47a84-9b8f-4da2-9316-9783b5259398'
order by updated_at desc
limit 20;

-- Workflow email logs if stored in DB
select id, reservation_id, template_id, status, recipient_email, sent_at, created_at
from sent_messages
order by created_at desc
limit 20;
