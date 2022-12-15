import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "../../../test/repositories/in-memory-notifications-repositories";
import { CountRecipientNotification } from "./count-recipient-notifications";

describe('Count Recipient Notifications', () => {

    it('should be able to count recipient notifications', async () => {

        const notificationRepository = new InMemoryNotificationRepository();
        const countRecipientNotifications = new CountRecipientNotification(notificationRepository);

        const recipientId = "idRecipient"

        await notificationRepository.create(makeNotification({ recipientId }));
        await notificationRepository.create(makeNotification({ recipientId }));
        await notificationRepository.create(makeNotification());

        const { count } = await countRecipientNotifications.execute({ recipientId });

        expect(count).toBe(2);
    });



});