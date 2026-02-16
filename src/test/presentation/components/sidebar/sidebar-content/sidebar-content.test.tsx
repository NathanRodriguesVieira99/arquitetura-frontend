import { render, screen, userEvent } from '@/test/utils/custom-render';
import { SidebarContent } from '@/presentation/components/sidebar/sidebar-content/sidebar-content';
import type { Prompt } from '@/shared/interfaces/prompt';
import type { SidebarContentProps } from '@/presentation/components/sidebar/sidebar-content/useSidebarContent.model';

const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

const initialPrompts: Prompt[] = [
  { id: '01', title: 'title 01', content: 'content 01' },
];

const makeSut = ({
  prompts = initialPrompts,
}: Partial<SidebarContentProps> = {}) => {
  return render(<SidebarContent prompts={prompts} />);
};

describe('<SidebarContent/>', () => {
  const user = userEvent.setup();

  describe('Renders', () => {
    it('should render new prompt button', () => {
      makeSut();

      const sidebar = screen.getByRole('complementary');
      const newPromptButton = screen.getByRole('button', {
        name: 'Novo Prompt',
      });

      expect(newPromptButton).toBeVisible();
      expect(sidebar).toBeVisible();
    });

    it('should render <PromptsList/>', () => {
      const input = [
        { id: '01', title: 'test prompt render 01', content: 'example 02' },
        { id: '02', title: 'test prompt render 02', content: 'example 03' },
      ];

      makeSut({ prompts: input });

      const promptTitle = screen.getByText(input[0].title);
      const promptListParagraph = screen.getAllByRole('paragraph');

      expect(promptTitle).toBeVisible();
      expect(promptListParagraph).toHaveLength(input.length);
    });

    it('should update <SearchInput/> on type', async () => {
      const inputText = 'text';
      makeSut();

      const searchInput = screen.getByPlaceholderText('Buscar prompts...');

      await user.type(searchInput, inputText);

      expect(searchInput).toHaveValue(inputText);
    });
  });

  describe('Actions', () => {
    it('should initialize expanded and display collapse button', () => {
      makeSut();

      const sidebar = screen.getByRole('complementary');
      const collapseButton = screen.getByRole('button', {
        name: 'Fechar menu lateral',
      });
      const expandButton = screen.queryByRole('button', {
        name: 'Expandir menu lateral',
      });

      expect(sidebar).toBeVisible();
      expect(collapseButton).toBeVisible();
      expect(expandButton).not.toBeInTheDocument();
    });

    it('should collapse and display expand button', async () => {
      makeSut();

      const collapseButton = screen.getByRole('button', {
        name: 'Fechar menu lateral',
      });

      await user.click(collapseButton);

      const expandButton = screen.getByRole('button', {
        name: 'Expandir menu lateral',
      });

      expect(expandButton).toBeVisible();
      expect(collapseButton).not.toBeVisible();
    });
  });

  describe('Navigation', () => {
    it('should navigate user to "/new" ', async () => {
      makeSut();

      const newPromptButton = screen.getByRole('button', {
        name: 'Novo Prompt',
      });

      await user.click(newPromptButton);

      expect(pushMock).toHaveBeenCalledWith('/new');
    });
  });
});
