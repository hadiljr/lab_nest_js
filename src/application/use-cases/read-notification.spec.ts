import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "../../../test/repositories/in-memory-notifications-repositories";

import { NotificationNotFound } from "./errors/notification-not-found";
import { ReadNotification } from "./read-notification";

describe('Read Notification', () => {

    it('should be able to read a notification', async () => {

        const notificationRepository = new InMemoryNotificationRepository();
        const readNotification = new ReadNotification(notificationRepository);

        const notification = makeNotification();

        await notificationRepository.create(notification);

        await readNotification.execute({
            notificationId: notification.id
        })

        expect(notificationRepository.notifications[0].readAt).toEqual(expect.any(Date));
    });

    it('should not be able to read a notification when it does not exist', async () => {

        const notificationRepository = new InMemoryNotificationRepository();
        const readNotification = new ReadNotification(notificationRepository);

        expect(() => {
            return readNotification.execute({ notificationId: "123" })
        })
            .rejects.toThrow(NotificationNotFound)

    });

});