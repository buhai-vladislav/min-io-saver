import { Avatar, Button, Card, Grid, Text } from '@nextui-org/react';
import React, { useCallback, useEffect } from 'react';
import {
  useGetTasksQuery,
  useRemoveTaskMutation,
} from '../../../../store/api/main.api';
import { TaskListWrapper } from './TaskList.presets';
import ScrollContainer from 'react-indiana-drag-scroll';
import { RemoveIcon } from '../../../../assets/RemoveIcon';
import { useAppSelector } from '../../../../store/hooks/hooks';

export const TaskList = () => {
  const { data, isLoading, refetch } = useGetTasksQuery();
  const { user } = useAppSelector((state) => state.user);
  const [removeTask] = useRemoveTaskMutation();

  const removeHandler = useCallback(
    (id: string) => async () => {
      await removeTask(id);
    },
    [],
  );

  useEffect(() => {
    refetch().catch((error) => console.error(error));
  }, [user]);

  const taskItems = data?.items.map(({ id, title, file }) => (
    <Grid key={id}>
      <Card variant="flat">
        <Card.Body className="item">
          <Avatar
            src={file.fileSrc}
            text={file.name}
            squared
            css={{ size: '$20' }}
          />
          <span className="title">{title}</span>
          <Button
            disabled={isLoading}
            onPress={removeHandler(id)}
            icon={<RemoveIcon />}
            color="error"
          />
        </Card.Body>
      </Card>
    </Grid>
  ));

  return (
    <TaskListWrapper>
      <Text h2>Tasks</Text>
      {!isLoading && (
        <ScrollContainer
          vertical
          horizontal={false}
          hideScrollbars={false}
          className="scroll-container"
        >
          {data?.items && data?.items.length > 0 ? (
            taskItems
          ) : (
            <Text h4>Task list is empty...</Text>
          )}
        </ScrollContainer>
      )}
    </TaskListWrapper>
  );
};
