import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";

export const HeaderTop = styled(AppBar)`
	.toolbar {
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flex;
		display: -o-flex;
		display: flex;
		.menu {
			margin-right: 10px;
		}
		.nav {
			display: -webkit-flex;
			display: -moz-flex;
			display: -ms-flex;
			display: -o-flex;
			display: flex;
			justify-content: space-around;
			-ms-align-items: center;
			align-items: center;
			.button {
				border: 1px solid #fff;
				color: white;
			}
		}
		.title {
			font-size: 20px;
			margin-right: auto;
			cursor: pointer;
		}
	}
`;
