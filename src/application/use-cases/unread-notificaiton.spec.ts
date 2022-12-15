import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "../../../test/repositories/in-memory-notifications-repositories";

import { NotificationNotFound } from "./errors/notification-not-found";
import { ReadNotification } from "./read-notification";
import { UnreadNotification } from "./unread-notification";

describe('Unread Notification', () => {

    it('should be able to unread a notification', async () => {

        const notificationRepository = new InMemoryNotificationRepository();
        const unreadNotification = new UnreadNotification(notificationRepository);

        const notification = makeNotification({ readAt: new Date() });

        await notificationRepository.create(notification);

        await unreadNotification.execute({
            notificationId: notification.id
        })

        expect(notificationRepository.notifications[0].readAt).toBeNull();
    });

    it('should not be able to unread a notification when it does not exist', async () => {

        const notificationRepository = new InMemoryNotificationRepository();
        const unreadNotification = new UnreadNotification(notificationRepository);

        expect(() => {
            return unreadNotification.execute({ notificationId: "123" })
        })
            .rejects.toThrow(NotificationNotFound)

    });

});