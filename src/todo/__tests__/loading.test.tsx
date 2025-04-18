import LoadingComponent from "../loading";
import {render, screen} from "@testing-library/react";

describe('<LoadingComponent />', () => {
    it('renders correctly', () => {
        render(<LoadingComponent />);

        expect(screen.getByText('Loading ...')).toBeInTheDocument();
    });
});