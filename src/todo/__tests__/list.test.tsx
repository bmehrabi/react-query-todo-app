import {render, screen, waitFor} from "@testing-library/react";
import List from "../list";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {vi} from 'vitest';
import axios from "axios";
import {TodoType} from "../../models/Todo";

vi.mock('axios');

const mockedAxios = axios as jest.MockedFunction<typeof axios>;

describe('<List>', () => {
    const getQueryClient = () => new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            }
        }
    });
    const setup = () => {
        render(
            <QueryClientProvider client={getQueryClient()}>
                <List />
            </QueryClientProvider>
        );
    }

    test('renders a loading if the API has not been resolved yet', () => {
        setup();

        expect(screen.getByText('Loading ...')).toBeInTheDocument();
    });

    test('renders table with todos from the API', async () => {
        const todo: TodoType = {
            id: 1,
            title: 'todo example',
            isImportant: false,
            hasDone: false,
        }
        mockedAxios.mockResolvedValue({
            data: [todo],
        });
        setup();

        await waitFor(() => {
            expect(screen.getByText('Description')).toBeInTheDocument();
        });

        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('todo example')).toBeInTheDocument();
    });
});