const { Novu } = require("@novu/node");

const novu = new Novu(process.env.NOVU_API_KEY);

const createNotificationSubscriber = async ({ id, email }) => {
  novu.subscribers.identify(id, {
    email: email,
  });
};

const sendTaskDeadlineEmail = async ({ id, email, taskName }) => {
  novu.trigger("task-deadline", {
    to: {
      subscriberId: id,
      email: email,
    },
    payload: {
      taskName: taskName,
    },
  });
};

const sendNewScheduleEmail = async ({ id, email, goalsCount }) => {
  novu.trigger("schedule-generated", {
    to: {
      subscriberId: id,
      email: email,
    },
    payload: {
      goalsCount: goalsCount,
    },
  });
};

module.exports = {
  createNotificationSubscriber,
  sendTaskDeadlineEmail,
  sendNewScheduleEmail,
};
