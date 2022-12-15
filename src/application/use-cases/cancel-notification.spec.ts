import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "../../../test/repositories/in-memory-notifications-repositories";
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFound } from "./errors/notification-not-found";

describe('Cancel Notification', () => {

    it('should be able to cancel a notification', async () => {

        const notificationRepository = new InMemoryNotificationRepository();
        const cancelNotification = new CancelNotification(notificationRepository);

        const notification = makeNotification();

        await notificationRepository.create(notification);

        await cancelNotification.execute({
            notificationId: notification.id
        })

        expect(notificationRepository.notifications[0].canceledAt).toEqual(expect.any(Date));
    });

    it('should not be able to cancel a notification when it does not exist', async () => {

        const notificationRepository = new InMemoryNotificationRepository();
        const cancelNotification = new CancelNotification(notificationRepository);

        expect(() => {
            return cancelNotification.execute({ notificationId: "123" })
        })
            .rejects.toThrow(NotificationNotFound)

    });

});