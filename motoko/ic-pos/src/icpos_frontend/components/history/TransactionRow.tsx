import { formatCkBtc } from "@/utils/formatCkBtc";
import { shortenPrincipal } from "@/utils/shortenPrincipal";
import { Transaction } from "@dfinity/ledger-icrc/dist/candid/icrc_index";
import { useInternetIdentity } from "ic-use-internet-identity";

export default function TransactionRow({
  transaction,
}: {
  transaction: Transaction;
}) {
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal().toString();

  const displayDate = new Date(Number(transaction.timestamp) / 1e6)
    .toISOString()
    .slice(0, 10);

  const plusOrMinus =
    transaction.transfer[0]?.from.owner.toString() === principal ? "-" : "+";

  return (
    <div className="flex flex-row items-center justify-between w-full p-5">
      <div>
        <div className="text-[0.8rem]">{displayDate}</div>
        {transaction.transfer[0]?.from.owner.toString() === principal ? (
          <div>
            To: {shortenPrincipal(transaction.transfer[0]?.to.owner.toString())}
          </div>
        ) : (
          <div>
            From:{" "}
            {shortenPrincipal(transaction.transfer[0]?.from.owner.toString())}
          </div>
        )}
      </div>
      <div className="text-[1.4rem]">
        {plusOrMinus}
        {formatCkBtc(transaction.transfer[0]?.amount)}
      </div>
    </div>
  );
}
