import { InMemoryNotificationRepository } from "../../../test/repositories/in-memory-notifications-repositories";
import { SendNotification } from "./send-notification";



describe('Send Notification', () => {

    it('should be able to send a notification', async () => {

        const notificationRepository = new InMemoryNotificationRepository();

        const sendNotification = new SendNotification(notificationRepository);

        const { notification } = await sendNotification.execute({
            content: 'This is a notification',
            category: 'category',
            recipientId: 'example-id'
        })

        console.log(notificationRepository.notifications);

        expect(notificationRepository.notifications).toHaveLength(1);
        expect(notificationRepository.notifications[0]).toEqual(notification);
    });

});