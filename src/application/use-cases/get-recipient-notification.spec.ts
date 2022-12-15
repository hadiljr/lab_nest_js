import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "../../../test/repositories/in-memory-notifications-repositories";
import { GetRecipientNotifications } from "./get-recipient-notifications";

describe('Get Recipient Notifications', () => {

    it('should be able to get recipient notifications', async () => {

        const notificationRepository = new InMemoryNotificationRepository();
        const countRecipientNotifications = new GetRecipientNotifications(notificationRepository);

        const recipientId = "idRecipient"

        await notificationRepository.create(makeNotification({ recipientId }));
        await notificationRepository.create(makeNotification({ recipientId }));
        await notificationRepository.create(makeNotification());

        const { notifications } = await countRecipientNotifications.execute({ recipientId });

        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(expect.arrayContaining([
            expect.objectContaining({ recipientId }),
            expect.objectContaining({ recipientId })
        ]))
    });



});