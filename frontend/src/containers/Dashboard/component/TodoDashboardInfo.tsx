import { RootState } from '@redux/store';
import { useSelector } from 'react-redux';

import PieCharts from '@shared/component/PieCharts';

import { IChartsTodo } from 'types/IChartsTodo';
import { ITodo } from 'types/ITodo';

const TodoDashboardInfo = () => {
  const { todos } = useSelector((state: RootState) => state.todos);

  const totalComplete = todos.filter((todo: ITodo) => todo.completed).length;
  const totalActive = todos.filter((todo: ITodo) => !todo.completed).length;

  const data: IChartsTodo[] = [
    { id: 'Выполнено', label: 'Выполнено', value: totalComplete },
    { id: 'Не выполнено', label: 'Не выполнено', value: totalActive },
  ];

  return (
    <div className="todo__container info">
      <h4 className="todo__title">Прогресс</h4>
      <div className="todo__wrapper">
        <PieCharts data={data} />
      </div>
      <div className="todo__block-info">
        <div className="todo__block-info__container">
          <p className="todo__block-info__title">Всего задач: {todos.length}</p>
          <p className="todo__block-info__title">Выполнено: {totalComplete}</p>
          <p className="todo__block-info__title">Не выполнено: {totalActive}</p>
        </div>
      </div>
    </div>
  );
};

export default TodoDashboardInfo;
